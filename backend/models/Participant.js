import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    college: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    teamName: String,

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    paymentId: { type: String, required: true },

    idProof: String, // file URL
    paymentScreenshot: String, // file URL
  },
  { timestamps: true },
);

export default mongoose.model("Participant", participantSchema);
