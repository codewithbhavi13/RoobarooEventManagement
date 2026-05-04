import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
} from "@mui/material";

import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Rules() {
  const [ruleInput, setRuleInput] = useState("");
  const [fee, setFee] = useState("");
  const [rules, setRules] = useState([]);
  const [eventId, setEventId] = useState("");
  const [image, setImage] = useState(null); // ✅ NEW

  const token = localStorage.getItem("token");

  // ✅ FETCH EVENT DATA
  const fetchMyEvent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = JSON.parse(atob(token.split(".")[1])).id;

      const myEvent = res.data.find(
        (e) => e.head?._id === userId || e.head === userId,
      );

      if (myEvent) {
        setEventId(myEvent._id);
        setRules(myEvent.rules || []);
        setFee(myEvent.entryFee || 0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyEvent();
  }, []);

  // ✅ ADD RULE
  const handleAddRule = async () => {
    if (!ruleInput) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/events/add-rule",
        { rule: ruleInput, eventId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setRules(res.data.rules);
      setRuleInput("");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // ✅ UPDATE FEE
  const handleUpdateFee = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/events/update-fee",
        { eventId, fee },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("Fee updated ✅");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // ✅ UPLOAD IMAGE
  const handleUploadImage = async () => {
    if (!image) return alert("Select image");

    const formData = new FormData();
    formData.append("image", image); // 🔥 MUST match multer
    formData.append("eventId", eventId);

    try {
      await axios.post(
        "http://localhost:5000/api/events/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Image uploaded ✅");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} mb={3}>
        Rules & Entry Fees
      </Typography>

      {/* ADD RULE + IMAGE */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: "20px" }}>
        <Typography fontWeight={700} mb={2}>
          Add Rule
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Enter Rule"
            value={ruleInput}
            onChange={(e) => setRuleInput(e.target.value)}
          />

          <Button variant="contained" onClick={handleAddRule}>
            <Add />
          </Button>
        </Box>

        {/* ENTRY FEE */}
        <Box mt={3}>
          <Typography fontWeight={700} mb={1}>
            Entry Fee (₹)
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              value={fee}
              onChange={(e) => setFee(e.target.value)}
            />

            <Button variant="contained" onClick={handleUpdateFee}>
              Save
            </Button>
          </Box>
        </Box>

        {/* 🔥 IMAGE UPLOAD */}
        <Box mt={3}>
          <Typography fontWeight={700} mb={1}>
            Upload Event Poster
          </Typography>

          <Button variant="outlined" component="label">
            Choose Image
            <input
              hidden
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>

          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={handleUploadImage}
          >
            Upload Image
          </Button>
        </Box>
      </Paper>

      {/* RULE LIST */}
      <Paper sx={{ p: 3, borderRadius: "20px" }}>
        <Typography fontWeight={700} mb={2}>
          Rules List
        </Typography>

        {rules.length === 0 ? (
          <Typography>No rules yet</Typography>
        ) : (
          <List>
            {rules.map((rule, index) => (
              <ListItem key={index}>
                {index + 1}. {rule}
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
