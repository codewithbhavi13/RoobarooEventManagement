import express from "express";

import { auth } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import Roles from "../enum/Roles.js";
import {
  assignMembers,
  createTask,
  updateStatus,
} from "../controllers/taskController.js";

const router = express.Router();

// CREATE EVENT → only admin + head
router.post("/create", auth, allowRoles(Roles.ADMIN), createTask);
router.post(
  "/assign-members",
  auth,
  allowRoles(
    Roles.SOCIALMEDIA_COMMITTEE_HEAD,
    Roles.CREATIVITY_COMMITTEE_HEAD,
    Roles.TECHNICAL_COMMITTEE_HEAD,
  ),
  assignMembers,
);
router.put(
  "/update-status",
  auth,
  allowRoles(
    Roles.CREATIVITY_COMMITTEE_HEAD,
    Roles.TECHNICAL_COMMITTEE_HEAD,
    Roles.SOCIALMEDIA_COMMITTEE_HEAD,
  ),
  updateStatus,
);

export default router;
