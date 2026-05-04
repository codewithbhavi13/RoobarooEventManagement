import Participant from "../models/Participant.js";

export const registerParticipant = async (req, res) => {
  try {
    const { name, college, phone, email, teamName, eventId, paymentId } =
      req.body;

    const participant = await Participant.create({
      name,
      college,
      phone,
      email,
      teamName,
      event: eventId,
      paymentId,
      idProof: req.files?.idProof?.[0]?.path || "",
      paymentScreenshot: req.files?.paymentScreenshot?.[0]?.path || "",
    });

    res.status(201).json({
      message: "Registration successful",
      participant,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
