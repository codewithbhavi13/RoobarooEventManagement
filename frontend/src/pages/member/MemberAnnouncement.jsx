import { Box, Typography, Paper, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function MemberAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  // ✅ FETCH EVENTS (to know user events)
  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/api/events", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // user participated OR head
    const myEvents = res.data
      .filter(
        (e) =>
          e.participants?.some((p) => p._id === user.id) ||
          e.head === user.id ||
          e.head?._id === user.id,
      )
      .map((e) => e._id);

    setEvents(myEvents);
  };

  // ✅ FETCH ANNOUNCEMENTS
  const fetchAnnouncements = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/events/announcement",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    // 🔥 FILTER LOGIC
    const filtered = res.data.announcements.filter(
      (a) =>
        a.event === null || // global
        events.includes(a.event?._id), // event-specific
    );

    setAnnouncements(filtered);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      fetchAnnouncements();
    }
  }, [events]);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Announcements
      </Typography>

      <Grid container spacing={3}>
        {announcements.map((a) => (
          <Grid item xs={12} md={6} key={a._id}>
            <Paper sx={{ p: 2 }}>
              <Typography fontWeight={600}>📢 {a.title}</Typography>

              <Typography>{a.message}</Typography>

              <Typography fontSize="0.85rem" color="gray">
                📍 {a.event ? a.event.title : "Global"}
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
