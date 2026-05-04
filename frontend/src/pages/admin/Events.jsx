import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Dialog,
  Grid,
  MenuItem,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";
import {
  Add,
  CalendarToday,
  AccessTime,
  LocationOn,
  Category,
  Star,
  Person,
  Close,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Events() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "one-min",
    date: "",
    time: "",
    venue: "",
  });

  const token = localStorage.getItem("token");

  // Reusable styling for form inputs
  const inputStyle = {
    "& .MuiInputLabel-root": {
      color: "rgba(127, 79, 36, 0.7)",
      fontSize: "0.9rem",
      transform: "translate(14px, 16px) scale(1)",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, 7px) scale(0.75) !important",
      color: "#582F0E",
      fontWeight: 700,
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      borderRadius: "12px",
      "& legend": { display: "none" },
      "& fieldset": { borderColor: "rgba(127, 79, 36, 0.2)", top: 0 },
      "&:hover fieldset": { borderColor: "#7F4F24" },
      "&.Mui-focused fieldset": { borderColor: "#7F4F24", borderWidth: "2px" },
      "& input, & .MuiSelect-select": {
        padding: "24px 14px 10px 14px !important",
      },
    },
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreate = async () => {
    if (!form.title || !form.category || !form.date) {
      alert("Please fill required fields");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/events/create", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpen(false);
      setForm({
        title: "",
        description: "",
        category: "one-min",
        date: "",
        time: "",
        venue: "",
      });
      fetchEvents();
    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
    }
  };

  const handleAccept = async (eventId, userId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/events/req-accepted",
        { eventId, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      alert("Head assigned ✅");
      fetchEvents();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FDFCFB 0%, #F3E9DC 100%)",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={900}
            color="#3A2D1E"
            sx={{ letterSpacing: "-1px" }}
          >
            Event Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and assign event heads
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: "12px",
            px: 3,
            py: 1.5,
            bgcolor: "#7F4F24",
            fontWeight: 700,
            "&:hover": { bgcolor: "#582F0E" },
            boxShadow: "0 8px 16px rgba(127, 79, 36, 0.2)",
          }}
        >
          Add Event
        </Button>
      </Box>

      {/* EVENTS LIST */}
      <Grid container spacing={3}>
        <AnimatePresence>
          {events.map((event) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={event._id}
              component={motion.div}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: "24px",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(127, 79, 36, 0.1)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* Category Badge */}
                <Chip
                  label={event.category}
                  size="small"
                  sx={{
                    mb: 2,
                    bgcolor: "rgba(127, 79, 36, 0.1)",
                    color: "#7F4F24",
                    fontWeight: 700,
                    borderRadius: "8px",
                  }}
                />

                <Typography
                  variant="h6"
                  fontWeight={800}
                  color="#3A2D1E"
                  gutterBottom
                >
                  {event.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, minHeight: "40px" }}
                >
                  {event.description}
                </Typography>

                <Divider sx={{ my: 2, opacity: 0.5 }} />

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      color: "#582F0E",
                    }}
                  >
                    <CalendarToday sx={{ fontSize: 18, opacity: 0.7 }} />
                    <Typography variant="body2" fontWeight={600}>
                      {event.date?.slice(0, 10)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      color: "#582F0E",
                    }}
                  >
                    <AccessTime sx={{ fontSize: 18, opacity: 0.7 }} />
                    <Typography variant="body2" fontWeight={600}>
                      {event.time}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      color: "#582F0E",
                    }}
                  >
                    <LocationOn sx={{ fontSize: 18, opacity: 0.7 }} />
                    <Typography variant="body2" fontWeight={600}>
                      {event.venue}
                    </Typography>
                  </Box>
                </Box>

                {/* HEAD ASSIGNMENT STATUS */}
                {event.head ? (
                  <Box
                    sx={{
                      mt: 3,
                      p: 1.5,
                      borderRadius: "12px",
                      bgcolor: "#E8F5E9",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Star sx={{ color: "#2E7D32" }} />
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="#2E7D32"
                    >
                      Head: {event.head.name}
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ mt: 3 }}>
                    {event.req?.length > 0 ? (
                      <Box>
                        <Typography
                          variant="caption"
                          fontWeight={800}
                          color="#7F4F24"
                          sx={{
                            textTransform: "uppercase",
                            mb: 1,
                            display: "block",
                          }}
                        >
                          Requests ({event.req.length})
                        </Typography>
                        {event.req.map((user) => (
                          <Box
                            key={user._id}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              p: 1,
                              border: "1px solid rgba(127, 79, 36, 0.1)",
                              borderRadius: "10px",
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2" fontWeight={600} noWrap>
                              {user.name}
                            </Typography>
                            <Button
                              size="small"
                              variant="contained"
                              disableElevation
                              onClick={() => handleAccept(event._id, user._id)}
                              sx={{
                                bgcolor: "#7F4F24",
                                fontSize: "0.7rem",
                                borderRadius: "8px",
                              }}
                            >
                              Assign
                            </Button>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="caption" color="text.disabled">
                        No pending requests
                      </Typography>
                    )}
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {/* CREATE EVENT MODAL */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: "24px", p: 2, background: "#FDFCFB" },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" fontWeight={900} color="#3A2D1E">
              New Event
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <TextField
            label="Event Title"
            fullWidth
            sx={inputStyle}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Description"
            multiline
            rows={2}
            fullWidth
            sx={inputStyle}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            margin="dense"
          />

          <TextField
            select
            label="Category"
            fullWidth
            sx={inputStyle}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            margin="dense"
          >
            <MenuItem value="one-min">One Min</MenuItem>
            <MenuItem value="main-theme">Main Theme</MenuItem>
            <MenuItem value="Indoor games">Indoor Games</MenuItem>
            <MenuItem value="outdoor games">Outdoor Games</MenuItem>
          </TextField>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                sx={inputStyle}
                InputLabelProps={{ shrink: true }}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Time"
                fullWidth
                sx={inputStyle}
                placeholder="10:00 AM"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                margin="dense"
              />
            </Grid>
          </Grid>

          <TextField
            label="Venue"
            fullWidth
            sx={inputStyle}
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            margin="dense"
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleCreate}
            sx={{
              mt: 4,
              py: 2,
              borderRadius: "14px",
              bgcolor: "#7F4F24",
              fontWeight: 800,
              "&:hover": { bgcolor: "#582F0E" },
            }}
          >
            Launch Event
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}
