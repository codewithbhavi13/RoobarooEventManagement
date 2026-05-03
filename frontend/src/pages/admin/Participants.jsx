import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Dialog,
  Chip,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Participants() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
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
    fetchData();
  }, []);

  return (
    <Box>
      {/* HEADER */}
      <Typography variant="h5" fontWeight={700} mb={2}>
        Participants Management
      </Typography>

      {/* SEARCH */}
      <TextField
        label="Search participant..."
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          background: "white",
          borderRadius: "8px",
        }}
      />

      {/* EVENTS GRID */}
      <Grid container spacing={3}>
        {events.map((event) => {
          const filteredParticipants = event.participants?.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
          );

          return (
            <Grid item xs={12} md={6} key={event._id}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  background: "#fff",
                }}
              >
                {/* EVENT TITLE */}
                <Typography fontWeight={700} fontSize="1.1rem">
                  🎯 {event.title}
                </Typography>

                {/* COUNT */}
                <Typography fontSize="0.85rem" color="gray" mb={1}>
                  👥 {event.participants?.length || 0} Participants
                </Typography>

                <Divider sx={{ mb: 1 }} />

                {/* PARTICIPANT CHIPS */}
                <Box mb={1}>
                  {filteredParticipants?.slice(0, 5).map((user) => (
                    <Chip
                      key={user._id}
                      label={user.name}
                      size="small"
                      sx={{
                        mr: 1,
                        mb: 1,
                        background: "#F5E6CC",
                        color: "#582F0E",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>

                {/* + MORE */}
                {filteredParticipants?.length > 5 && (
                  <Typography fontSize="0.8rem" color="gray">
                    +{filteredParticipants.length - 5} more...
                  </Typography>
                )}

                {/* BUTTON */}
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    mt: 1,
                    background: "#582F0E",
                    "&:hover": { background: "#7F4F24" },
                  }}
                  onClick={() => setSelectedEvent(event)}
                >
                  View Details
                </Button>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* MODAL */}
      <Dialog
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            🎯 {selectedEvent?.title} Participants
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {selectedEvent?.participants?.map((user) => (
            <Paper
              key={user._id}
              sx={{
                p: 2,
                mb: 1,
                borderRadius: "10px",
                background: "#fafafa",
              }}
            >
              <Typography fontWeight={600}>
                👤 {user.name}
              </Typography>

              <Typography fontSize="0.85rem" color="gray">
                📧 {user.email}
              </Typography>

              <Typography fontSize="0.85rem" color="gray">
                📱 {user.phone}
              </Typography>

              <Typography fontSize="0.85rem" color="#2e7d32">
                💰 ₹{user.feePaid ?? 0}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Dialog>
    </Box>
  );
}