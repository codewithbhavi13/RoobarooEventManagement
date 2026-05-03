import Event from "../models/Event.js";
import Requirement from "../models/Requirement.js";

export const createRequirement = async (req, res) => {
  try {
    const { title, description, eventId, items } = req.body;
    const userId = req.user.id;

    // 1. Basic validation
    if (!title || !eventId) {
      return res.status(400).json({
        message: "Title and eventId are required",
      });
    }

    // 2. Check event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // 3. Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Items must be a non-empty array",
      });
    }

    // 4. Calculate total estimated price
    let totalEstimatedPrice = 0;

    for (const item of items) {
      if (
        !item.itemName ||
        item.quantity == null ||
        item.estimatedPrice == null
      ) {
        return res.status(400).json({
          message: "Each item must have itemName, quantity and estimatedPrice",
        });
      }

      totalEstimatedPrice += item.quantity * item.estimatedPrice;
    }

    // 5. Create requirement
    const requirement = await Requirement.create({
      title,
      description,
      event: eventId,
      items,
      createdBy: userId,
      totalEstimatedPrice,
    });

    res.status(201).json({
      message: "Requirement created successfully",
      requirement,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const fullfillRequirement = async (req, res) => {
  try {
    const { requirementId } = req.body;

    // 1. Validate input
    if (!requirementId) {
      return res.status(400).json({
        message: "requirementId is required",
      });
    }

    // 2. Update only if not already fulfilled
    const requirement = await Requirement.findOneAndUpdate(
      { _id: requirementId, status: { $ne: "fulfilled" } },
      { status: "fulfilled" },
      { new: true },
    );

    // 3. Handle cases
    if (!requirement) {
      return res.status(400).json({
        message: "Requirement not found or already fulfilled",
      });
    }

    res.status(200).json({
      message: "Requirement fulfilled successfully",
      requirement,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
