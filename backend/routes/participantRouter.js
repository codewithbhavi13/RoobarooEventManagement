import express from "express";
import { registerParticipant } from "../controllers/participantController.js";
import { auth } from "../middleware/authMiddleware.js";
import { participantUpload } from "../middleware/upload.js";
const router = express.Router();

router.post("/register", auth, participantUpload, registerParticipant);

export default router;
