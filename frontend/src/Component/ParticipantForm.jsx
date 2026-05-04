import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function ParticipantForm({ eventId }) {
  const [form, setForm] = useState({
    name: "",
    college: "",
    phone: "",
    email: "",
    teamName: "",
    paymentId: "",
  });

  const [files, setFiles] = useState({
    idProof: null,
    paymentScreenshot: null,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // form fields
      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      data.append("eventId", eventId);

      // files
      data.append("idProof", files.idProof);
      data.append("paymentScreenshot", files.paymentScreenshot);

      await axios.post(
        "http://localhost:5000/api/participants/register",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("✅ Registration Successful");
    } catch (err) {
      console.error(err);
      alert("❌ Registration Failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper sx={{ width: "100%", maxWidth: 700, p: 5 }}>
        <Typography align="center" sx={{ mb: 3 }}>
          RooBaRoo Registration
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            name="name"
            label="Full Name"
            onChange={handleChange}
            required
          />
          <TextField
            name="college"
            label="College Name"
            onChange={handleChange}
            required
          />
          <TextField
            name="phone"
            label="Phone Number"
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            label="Email Address"
            onChange={handleChange}
            required
          />
          <TextField
            name="teamName"
            label="Team Name (Optional)"
            onChange={handleChange}
          />

          {/* FILES */}
          <Button component="label">
            Upload College ID
            <input
              hidden
              type="file"
              name="idProof"
              onChange={handleFileChange}
              required
            />
          </Button>

          <TextField
            name="paymentId"
            label="Payment ID / UTR Number"
            onChange={handleChange}
            required
          />

          <Button component="label">
            Upload Payment Screenshot
            <input
              hidden
              type="file"
              name="paymentScreenshot"
              onChange={handleFileChange}
              required
            />
          </Button>

          <Button type="submit" variant="contained">
            Submit Registration
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
