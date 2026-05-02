import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    category: {
      type: String,
      enum: ["one-min", "main-theme", "Indoor games", "outdoor games"],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: String,

    entryFee: {
      type: Number,
      default: 0,
    },

    image: String, // poster URL

    // 👇 Contact info
    head: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 👇 Rules (from your posters)
    rules: [String],

    // 👇 Participants
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    req: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Event", eventSchema);
