import express from "express";

import { auth } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import {
  acceptReqForCommitteeHead,
  getAllMembers,
  requestForCommitteeHead,
} from "../controllers/committeeController.js";
import Roles from "../enum/Roles.js";

const router = express.Router();

// CREATE EVENT → only admin + head
router.post(
  "/req-head",
  auth,
  allowRoles(Roles.MEMBER),
  requestForCommitteeHead,
);
router.post(
  "/accept-req",
  auth,
  allowRoles(Roles.ADMIN),
  acceptReqForCommitteeHead,
);

router.get("/get-members", auth, getAllMembers);

export default router;
