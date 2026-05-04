import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { EventContext } from "../../context/Event";

export default function Announcement() {
  const { events, announcements, handleCreateAnnouncement } =
    useContext(EventContext);

  const [form, setForm] = useState({
    title: "",
    message: "",
    event: "", // empty = global
  });

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Announcements
      </Typography>

      {/* 🔥 CREATE FORM */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography fontWeight={600} mb={2}>
          Create Announcement
        </Typography>

        <TextField
          label="Title"
          fullWidth
          margin="dense"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <TextField
          label="Message"
          fullWidth
          multiline
          rows={3}
          margin="dense"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        {/* 🎯 EVENT DROPDOWN */}
        <TextField
          select
          label="Select Event (Optional)"
          fullWidth
          margin="dense"
          value={form.event}
          onChange={(e) => setForm({ ...form, event: e.target.value })}
        >
          <MenuItem value="">🌍 Global (All Users)</MenuItem>

          {events.map((event) => (
            <MenuItem key={event._id} value={event._id}>
              {event.title}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => {
            handleCreateAnnouncement(form);
            setForm({ title: "", message: "", event: "" });
          }}
        >
          Create Announcement
        </Button>
      </Paper>

      {/* 📢 ANNOUNCEMENT LIST */}
      <Grid container spacing={3}>
        {announcements.map((a) => (
          <Grid item xs={12} md={6} key={a._id}>
            <Paper sx={{ p: 2 }}>
              <Typography fontWeight={600}>📢 {a.title}</Typography>

              <Typography>{a.message}</Typography>

              <Typography fontSize="0.85rem" color="gray">
                📍 {a.event ? a.event.title : "Global Announcement"}
              </Typography>

              <Typography fontSize="0.8rem" color="gray">
                👤 {a.createdBy?.name}
              </Typography>

              <Typography fontSize="0.75rem" color="gray">
                🕒 {new Date(a.createdAt).toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
