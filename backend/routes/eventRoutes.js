import express from "express";
import { updateFee } from "../controllers/eventController.js";
import {
  createEvent,
  getEvents,
  joinEvent,
  getEventById,
  createReqEventAdmin,
  acceptEventHeadReq,
  addRule,
  createAnnouncement,
  getAllAnnouncements,
} from "../controllers/eventController.js";
import { uploadEventImage } from "../controllers/eventController.js";
import { auth } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

import { eventUpload } from "../middleware/upload.js";
const router = express.Router();

// CREATE EVENT → only admin + head
router.post("/create", auth, allowRoles("admin"), createEvent);

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
router.post("/update-fee", auth, allowRoles("event_head"), updateFee);
router.post(
  "/upload-image",
  auth,
  allowRoles("event_head"),
  eventUpload,
  uploadEventImage,
);
router.post(
  "/announcement/create",
  auth,
  allowRoles("admin"),
  createAnnouncement,
);

router.get("/announcement", auth, getAllAnnouncements);

// GET SINGLE EVENT
router.get("/:id", auth, getEventById);

export default router;
