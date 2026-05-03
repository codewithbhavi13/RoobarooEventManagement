import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    rollNo: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      enum: ["MCA", "MMS"],
      required: true,
    },

    committees: {
      type: [String],
      validate: {
        validator: (val) => val.length <= 2,
        message: "Max 2 committees allowed",
      },
    },

    password: {
      type: String,
      required: true,
    },

    // 🔥 UPDATED ROLE
    role: {
      type: String,
      enum: ["admin", "committee_head", "event_head", "member"],
      default: "member",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
