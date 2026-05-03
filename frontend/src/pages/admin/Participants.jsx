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
  InputAdornment,
  Avatar,
  IconButton,
} from "@mui/material";
import { 
  Search, 
  Group, 
  Close, 
  ReceiptLong, 
  ContactPhone, 
  AlternateEmail,
  EventAvailable 
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Participants() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const token = localStorage.getItem("token");

  // Custom Input Style (matching your login theme)
  const searchStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      backgroundColor: "white",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      "& fieldset": { borderColor: "rgba(127, 79, 36, 0.1)" },
      "&:hover fieldset": { borderColor: "#7F4F24" },
      "&.Mui-focused fieldset": { borderColor: "#7F4F24", borderWidth: "2px" },
    },
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, background: "#FDFCFB", minHeight: "100vh" }}>
      
      {/* HEADER SECTION */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={900} color="#3A2D1E" sx={{ letterSpacing: "-1px" }}>
            Participant Hub
          </Typography>
        </Box>

        <TextField
          placeholder="Filter by name..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: "100%", sm: 300 }, ...searchStyle }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#7F4F24" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* EVENTS GRID */}
      <Grid container spacing={3}>
        <AnimatePresence>
          {events.map((event) => {
            const filteredParticipants = event.participants?.filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase())
            );

            return (
              <Grid item xs={12} md={6} lg={4} key={event._id} component={motion.div} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "24px",
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(127, 79, 36, 0.1)",
                    backdropFilter: "blur(10px)",
                    transition: "0.3s",
                    "&:hover": { 
                      transform: "translateY(-5px)",
                      boxShadow: "0 20px 40px rgba(94, 64, 35, 0.08)",
                      borderColor: "#7F4F24"
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Avatar sx={{ bgcolor: "#7F4F24", width: 40, height: 40 }}>
                      <EventAvailable sx={{ fontSize: 20 }} />
                    </Avatar>
                    <Typography variant="h6" fontWeight={800} color="#3A2D1E" noWrap>
                      {event.title}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Group sx={{ color: "text.secondary", fontSize: 18 }} />
                    <Typography variant="body2" fontWeight={600} color="text.secondary">
                      {event.participants?.length || 0} Registered
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 2, opacity: 0.6 }} />

                  {/* PREVIEW PARTICIPANTS */}
                  <Box sx={{ minHeight: 80 }}>
                    {filteredParticipants?.slice(0, 4).map((user) => (
                      <Chip
                        key={user._id}
                        label={user.name}
                        size="small"
                        sx={{ 
                          mr: 0.8, mb: 0.8, 
                          bgcolor: "rgba(127, 79, 36, 0.05)", 
                          fontWeight: 600, 
                          color: "#582F0E",
                          border: "1px solid rgba(127, 79, 36, 0.1)"
                        }}
                      />
                    ))}
                    {filteredParticipants?.length > 4 && (
                      <Typography variant="caption" sx={{ color: "#7F4F24", fontWeight: 700, display: 'block', mt: 0.5 }}>
                        +{filteredParticipants.length - 4} others matching filter
                      </Typography>
                    )}
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setSelectedEvent(event)}
                    sx={{
                      mt: 2,
                      borderRadius: "12px",
                      bgcolor: "#582F0E",
                      textTransform: "none",
                      fontWeight: 700,
                      py: 1,
                      "&:hover": { bgcolor: "#3A2D1E" },
                    }}
                  >
                    Manage List
                  </Button>
                </Paper>
              </Grid>
            );
          })}
        </AnimatePresence>
      </Grid>

      {/* DETAIL DIALOG */}
      <Dialog
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: "28px", p: 1, background: "#FDFCFB" }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h5" fontWeight={900} color="#3A2D1E">
                {selectedEvent?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Detailed Participant Ledger
              </Typography>
            </Box>
            <IconButton onClick={() => setSelectedEvent(null)} sx={{ bgcolor: "#F3E9DC" }}>
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ maxHeight: "60vh", overflowY: "auto", pr: 1 }}>
            {selectedEvent?.participants?.length > 0 ? (
              selectedEvent.participants.map((user) => (
                <Paper
                  key={user._id}
                  elevation={0}
                  sx={{
                    p: 2, mb: 2,
                    borderRadius: "16px",
                    background: "white",
                    border: "1px solid rgba(0,0,0,0.04)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={800} color="#3A2D1E" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: "#F5E6CC", color: "#582F0E" }}>
                      {user.name[0]}
                    </Avatar>
                    {user.name}
                  </Typography>

                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AlternateEmail sx={{ fontSize: 16, color: "gray" }} />
                        <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ContactPhone sx={{ fontSize: 16, color: "gray" }} />
                        <Typography variant="body2" color="text.secondary">{user.phone}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ 
                        mt: 1, p: 1, borderRadius: "8px", 
                        bgcolor: user.feePaid > 0 ? "#E8F5E9" : "#FFEBEE",
                        display: 'inline-flex', alignItems: 'center', gap: 1
                      }}>
                        <ReceiptLong sx={{ fontSize: 16, color: user.feePaid > 0 ? "#2E7D32" : "#C62828" }} />
                        <Typography variant="caption" fontWeight={800} color={user.feePaid > 0 ? "#2E7D32" : "#C62828"}>
                          FEE PAID: ₹{user.feePaid ?? 0}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography color="text.disabled">No participants found for this event.</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}