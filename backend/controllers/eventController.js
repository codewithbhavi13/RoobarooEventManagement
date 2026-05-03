import Announcement from "../models/Annoucement.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔍 debug

    const { title, description, category, date, time, venue } = req.body;

    // ✅ VALIDATION (prevents 500 crash)
    if (!title || !category || !date) {
      return res.status(400).json({
        message: "Title, Category and Date are required",
      });
    }

    // ✅ CHECK USER (safety)
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    // ✅ CREATE EVENT (date fix applied)
    const event = await Event.create({
      title,
      description,
      category,
      date: new Date(date), // ⭐ IMPORTANT FIX
      time,
      venue,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (err) {
    console.error("CREATE EVENT ERROR:", err); // 🔥 shows exact issue
    res.status(500).json({
      message: "Server error while creating event",
      error: err.message,
    });
  }
};

// GET EVENTS
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name role")
      .populate("req", "name email") // 🔥 ADD THIS
      .populate("head", "name")
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// JOIN EVENT
export const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // ❌ prevent duplicate join
    if (event.participants.includes(req.user.id)) {
      return res.status(400).json({ message: "Already joined" });
    }

    event.participants.push(req.user.id);
    await event.save();

    res.json({ message: "Joined successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE EVENT
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "participants",
      "name email",
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createReqEventAdmin = async (req, res) => {
  try {
    const { eventId } = req.body;
    const { id } = req.user; // logged-in user

    // 1️⃣ Find the event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 2️⃣ Check if event already has a head
    if (event.head) {
      return res.status(400).json({
        message: "Event already has a head assigned",
      });
    }

    // 3️⃣ Check if user is already a head of another event
    const existingEvent = await Event.findOne({ head: id });

    if (existingEvent) {
      return res.status(400).json({
        message: "User is already assigned as head of another event",
      });
    }

    // 4️⃣ Prevent duplicate request
    if (event.req.includes(id)) {
      return res.status(400).json({
        message: "You have already requested for this event",
      });
    }

    // 5️⃣ Add request
    event.req.push(id);
    await event.save();

    return res.status(200).json({
      message: "Request sent successfully",
      event,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const acceptEventHeadReq = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    // 1️⃣ Find event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 2️⃣ Check if event already has a head
    if (event.head) {
      return res.status(400).json({
        message: "Event already has a head",
      });
    }

    // 3️⃣ Check if user is already head of another event
    const existingEvent = await Event.findOne({ head: userId });

    if (existingEvent) {
      return res.status(400).json({
        message: "User is already head of another event",
      });
    }

    // 4️⃣ (Optional but good) Check if user actually requested
    if (!event.req.includes(userId)) {
      return res.status(400).json({
        message: "User has not requested for this event",
      });
    }

    // 5️⃣ Assign head
    event.head = userId;

    // 6️⃣ Clear all requests
    event.req = [];

    User.findByIdAndUpdate(userId, { role: "event_head" }, { new: true })
      .then((user) => console.log(user))
      .catch((err) => console.error(err));

    await event.save();

    return res.status(200).json({
      message: "Event head assigned successfully",
      event,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const addRule = async (req, res) => {
  try {
    const { rule, eventId } = req.body;
    const { id: userId } = req.user;

    if (!rule || !eventId) {
      return res.status(400).json({ message: "Rule and eventId are required" });
    }

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId, head: userId }, // check event exists + user is head
      { $push: { rules: rule } }, // add rule to array
      { new: true, runValidators: true },
    );

    if (!updatedEvent) {
      return res.status(404).json({
        message: "Event not found or you are not authorized",
      });
    }

    return res.status(200).json({
      message: "Rule added successfully",
      rules: updatedEvent.rules,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, eventId } = req.body;
    const { id } = req.user;

    let event = null;

    // If eventId is provided, check if it exists
    if (eventId) {
      const existingEvent = await Event.findById(eventId);

      if (!existingEvent) {
        return res.status(404).json({
          message: "Event not found",
        });
      }

      event = eventId;
    }

    const announcement = await Announcement.create({
      title,
      message,
      event, // either eventId or null
      createdBy: id,
    });

    res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate("event", "title date")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: announcements.length,
      announcements,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
