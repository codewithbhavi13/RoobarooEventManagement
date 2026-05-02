import Event from "../models/Event.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const { title, description, category, date, time, entryFee, image, rules } =
      req.body;

    const event = await Event.create({
      title,
      description,
      category,
      date,
      time,
      entryFee,
      image,
      rules,
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
