import Event from "../models/Event.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, eventId, userId, deadline } = req.body;

    // 1. Basic validation
    if (!title || !eventId || !userId) {
      return res.status(400).json({
        message: "Title, eventId and userId are required",
      });
    }

    // 2. Check Event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // 3. Check User exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 4. Validate deadline (optional)
    let parsedDeadline = undefined;
    if (deadline) {
      parsedDeadline = new Date(deadline);
      if (isNaN(parsedDeadline)) {
        return res.status(400).json({
          message: "Invalid deadline format",
        });
      }
    }

    // 5. Create task
    const task = await Task.create({
      title,
      description,
      event: eventId,
      head: userId,
      deadline: parsedDeadline,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const assignMembers = async (req, res) => {
  try {
    const { taskId, userId } = req.body;

    // 1. Validate inputs
    if (!taskId || !userId) {
      return res.status(400).json({
        message: "taskId and userId are required",
      });
    }

    // 2. Check user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 3. Check user is NOT assigned to any other task
    const existingTask = await Task.findOne({
      assignedTo: userId,
      status: { $ne: "completed" }, // only check active tasks
    });

    if (existingTask) {
      return res.status(400).json({
        message: "User is already assigned to an active task",
      });
    }

    // 4. Check task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // 5. Prevent duplicate assignment in same task (optional but smart)
    if (task.assignedTo.includes(userId)) {
      return res.status(400).json({
        message: "User already assigned to this task",
      });
    }

    // 6. Add user to assignedTo array
    task.assignedTo.push(userId);
    await task.save();

    res.status(200).json({
      message: "User assigned to task successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;

    // 1. Validate input
    if (!taskId || !status) {
      return res.status(400).json({
        message: "taskId and status are required",
      });
    }

    // 2. Validate status
    const validStatuses = ["pending", "in-progress", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    // 3. Check task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // 4. Update status
    task.status = status;
    await task.save();

    res.status(200).json({
      message: "Task status updated successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
