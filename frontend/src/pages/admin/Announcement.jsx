import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Grid,
  Chip,
  Avatar,
  Divider,
  InputAdornment,
} from "@mui/material";
import { 
  Campaign, 
  Public, 
  EventNote, 
  Person, 
  AccessTime, 
  Send 
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", message: "", event: "" });

  const token = localStorage.getItem("token");

  const inputStyle = {
  mb: 2,
  "& .MuiInputLabel-root": {
    color: "rgba(127, 79, 36, 0.6)",
    fontSize: "0.9rem",
    "&.Mui-focused": {
      color: "#582F0E", // Darker brown on focus
      fontWeight: 700,
    },
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    borderRadius: "16px",
    transition: "all 0.3s ease-in-out",
    "& fieldset": {
      borderColor: "rgba(127, 79, 36, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(127, 79, 36, 0.4)",
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: "0 0 0 4px rgba(127, 79, 36, 0.1)", // Subtle outer glow
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7F4F24 !important", // Brand color border
      borderWidth: "2px",
    },
  },
};

  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/api/events", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvents(res.data);
  };

  const fetchAnnouncements = async () => {
    const res = await axios.get("http://localhost:5000/api/events/announcement", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAnnouncements(res.data.announcements);
  };

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
  }, []);

  const handleCreate = async () => {
    if (!form.title || !form.message) {
      alert("Fill all fields");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/events/announcement/create",
        { title: form.title, message: form.message, event: form.event || null },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ title: "", message: "", event: "" });
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, background: "#f8f9fa", minHeight: "100vh" }}>
      {/* HEADER SECTION */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
        <Avatar sx={{ bgcolor: "#7F4F24", width: 56, height: 56 }}>
          <Campaign fontSize="large" />
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#3A2D1E">
            Announcements
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Broadcasting news and event updates to the team
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* LEFT: CREATE FORM */}
        <Grid item xs={12} lg={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: "24px", 
              border: "1px solid rgba(127, 79, 36, 0.1)",
              position: "sticky",
              top: 24
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3} display="flex" alignItems="center" gap={1}>
              <Send fontSize="small" color="primary" /> New Post
            </Typography>

            {/* Headline Field */}
            <TextField
              label="Headline"
              placeholder="e.g., Weekend Workshop Update"
              fullWidth
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              sx={inputStyle}
            />

            {/* Message Field */}
            <TextField
              label="Detailed Message"
              fullWidth
              multiline
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              sx={inputStyle}
            />

            {/* Select Field */}
            <TextField
              select
              label="Target Audience"
              fullWidth
              value={form.event}
              onChange={(e) => setForm({ ...form, event: e.target.value })}
              sx={inputStyle}
            >
              <MenuItem value="">🌍 Global (Everyone)</MenuItem>
              {events.map((event) => (
                <MenuItem key={event._id} value={event._id}>
                  🎯 {event.title}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{ 
                mt: 3, 
                borderRadius: "12px", 
                py: 1.5, 
                bgcolor: "#7F4F24",
                "&:hover": { bgcolor: "#582F0E" },
                boxShadow: "0 8px 16px rgba(127, 79, 36, 0.2)"
              }}
              onClick={handleCreate}
            >
              Post Announcement
            </Button>
          </Paper>
        </Grid>

        {/* RIGHT: FEED */}
        <Grid item xs={12} lg={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {announcements.length === 0 && (
              <Typography color="text.disabled" textAlign="center" py={10}>
                No announcements yet. Be the first to share!
              </Typography>
            )}
            
            {announcements.map((a) => (
              <Box 
                key={a._id}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    borderRadius: "24px", 
                    border: "1px solid rgba(0,0,0,0.05)",
                    transition: "0.3s",
                    "&:hover": { boxShadow: "0 12px 24px rgba(0,0,0,0.05)" }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {a.event ? (
                        <Chip 
                          icon={<EventNote sx={{ fontSize: '1rem !important' }} />} 
                          label={a.event.title} 
                          size="small" 
                          sx={{ borderRadius: '8px', bgcolor: 'rgba(127, 79, 36, 0.1)', color: '#7F4F24', fontWeight: 700 }} 
                        />
                      ) : (
                        <Chip 
                          icon={<Public sx={{ fontSize: '1rem !important' }} />} 
                          label="Global" 
                          size="small" 
                          sx={{ borderRadius: '8px', bgcolor: 'rgba(0, 150, 136, 0.1)', color: '#00796B', fontWeight: 700 }} 
                        />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled' }}>
                      <AccessTime sx={{ fontSize: 14 }} />
                      <Typography fontSize="0.75rem">
                        {new Date(a.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" fontWeight={700} color="#3A2D1E" gutterBottom>
                    {a.title}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {a.message}
                  </Typography>

                  <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: '#E0E0E0' }}>
                        {a.createdBy?.name?.charAt(0)}
                      </Avatar>
                      <Typography variant="caption" fontWeight={600} color="text.primary">
                        {a.createdBy?.name || "Admin"}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.disabled">
                      {new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}