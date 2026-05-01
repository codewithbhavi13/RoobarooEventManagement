import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "head", "member"],
    default: "member",
  },
  committeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Committee",
  },
});

export default mongoose.model("User", userSchema);
