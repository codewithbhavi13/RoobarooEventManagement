// middleware/upload.js
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ for event image
export const eventUpload = upload.single("image");

// ✅ for participant
export const participantUpload = upload.fields([
  { name: "idProof", maxCount: 1 },
  { name: "paymentScreenshot", maxCount: 1 },
]);
