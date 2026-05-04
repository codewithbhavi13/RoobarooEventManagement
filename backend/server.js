import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRouter.js";
import eventRoutes from "./routes/eventRoutes.js";
import committeeRoutes from "./routes/committeeRoutes.js";
import taskRoutes from "./routes/taskRouter.js";
import participantRouter from "./routes/participantRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/committee", committeeRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/participants", participantRouter);
app.get("/", (req, res) => {
  res.send("Server is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
