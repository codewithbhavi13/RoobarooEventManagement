import express from "express";
import {
  createEvent,
  getEvents,
  joinEvent,
  getEventById,
  createReqEventAdmin,
  acceptEventHeadReq,
  addRule,
} from "../controllers/eventController.js";

import { auth } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// CREATE EVENT → only admin + head
router.post("/create", auth, allowRoles("admin", "event_head"), createEvent);

// GET ALL EVENTS → all logged-in users
router.get("/", auth, getEvents);

//  JOIN EVENT → member (you can allow all if needed)
router.post(
  "/join/:id",
  auth,
  allowRoles("member", "event_head", "admin"),
  joinEvent,
);

router.post(
  "/req-event-admin",
  auth,
  allowRoles("member"),
  createReqEventAdmin,
);

router.post("/req-accepted", auth, allowRoles("admin"), acceptEventHeadReq);

router.post("/add-rule", auth, allowRoles("event_head"), addRule);

// GET SINGLE EVENT
router.get("/:id", auth, getEventById);

export default router;
