import Event from "../models/Event.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, entryFee } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      time,
      entryFee,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET EVENTS
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name role")
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
