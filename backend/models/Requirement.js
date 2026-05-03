import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["pending", "fulfilled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Requirement", requirementSchema);
