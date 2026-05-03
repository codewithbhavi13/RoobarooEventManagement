import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function MemberEvent() {
  const [events, setEvents] = useState([]);

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const userId = user.id;

  // 🔥 FETCH EVENTS
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔥 REQUEST FUNCTION
  const handleRequest = async (eventId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/events/req-event-admin",
        { eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Request sent ✅");
      fetchEvents();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Events
      </Typography>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} md={4} key={event._id}>
            <Paper sx={{ p: 2 }}>
              <Typography fontWeight={600}>{event.title}</Typography>

              <Typography>{event.description}</Typography>

              <Typography>📅 {event.date?.slice(0, 10)}</Typography>
              <Typography>⏰ {event.time}</Typography>
              <Typography>📍 {event.venue}</Typography>

              {/* 🔥 BUTTON LOGIC */}
              <Box mt={2}>
                {event.head ? (
                  <Button fullWidth disabled color="error">
                    Head Assigned
                  </Button>
                ) : event.req?.includes(userId) ? (
                  <Button fullWidth disabled>
                    Requested
                  </Button>
                ) : event.head === userId ? (
                  <Button fullWidth color="success">
                    You are Head
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleRequest(event._id)}
                  >
                    Request to be Head
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
