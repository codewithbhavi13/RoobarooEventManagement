import express from "express";
import {
  createEvent,
  getEvents,
  joinEvent,
  getEventById,
} from "../controllers/eventController.js";

import { auth } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// CREATE EVENT → only admin + head
router.post("/create", auth, allowRoles("admin", "head"), createEvent);

// GET ALL EVENTS → all logged-in users
router.get("/", auth, getEvents);

//  JOIN EVENT → member (you can allow all if needed)
router.post(
  "/join/:id",
  auth,
  allowRoles("member", "head", "admin"),
  joinEvent,
);

// GET SINGLE EVENT
router.get("/:id", auth, getEventById);

export default router;
