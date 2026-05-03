import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    estimatedPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }, // optional: prevents creating _id for each item
);

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
    items: {
      type: [itemSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "fulfilled"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalEstimatedPrice: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Requirement", requirementSchema);
