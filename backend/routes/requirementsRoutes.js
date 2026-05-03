import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import Role from "../enum/Roles.js";
import { fullfillRequirement } from "../controllers/requirementController.js";
const router = express.Router();

router.post(
  "/create",
  auth,
  allowRoles(
    Role.EVENT_HEAD,
    Role.CREATIVITY_COMMITTEE_HEAD,
    Role.TECHNICAL_COMMITTEE_HEAD,
    Role.SOCIALMEDIA_COMMITTEE_HEAD,
  ),
);
router.post("/fullfill", auth, allowRoles(Role.ADMIN), fullfillRequirement);

export default authRouter;
