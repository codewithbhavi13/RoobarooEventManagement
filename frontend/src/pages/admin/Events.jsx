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
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { 
  Add, 
  CalendarToday, 
  AccessTime, 
  LocationOn, 
  Close, 
  Star 
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Events() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "", description: "", category: "one-min",
    date: "", time: "", venue: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const token = localStorage.getItem("token");

  const inputStyle = {
    "& .MuiInputLabel-root": { 
      color: "rgba(127, 79, 36, 0.7)", 
      fontSize: "0.9rem",
      "&.Mui-focused": { color: "#582F0E !important" }
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      borderRadius: "12px",
      "& fieldset": { borderColor: "rgba(127, 79, 36, 0.2)" },
      "&.Mui-focused fieldset": { borderColor: "#7F4F24 !important", borderWidth: "2px" },
    },
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleCreate = async () => {
    if (!form.title || !form.category || !form.date) return alert("Fill required fields");
    try {
      await axios.post("http://localhost:5000/api/events/create", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpen(false);
      setForm({ title: "", description: "", category: "one-min", date: "", time: "", venue: "" });
      fetchEvents();
    } catch (err) { console.error(err); }
  };

  const handleAccept = async (eventId, userId) => {
    try {
      await axios.post("http://localhost:5000/api/events/req-accepted", { eventId, userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (err) { console.error(err); }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #FDFCFB 0%, #F3E9DC 100%)",
      py: { xs: 2, md: 5 },
      width: "100%",
      overflowX: "hidden"
    }}>
      <Container maxWidth="lg">
        
        {/* HEADER SECTION */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" }, 
          justifyContent: "space-between", 
          alignItems: { xs: "flex-start", sm: "center" }, 
          gap: 2, mb: 6 
        }}>
          <Box>
            <Typography variant="h4" fontWeight={900} color="#3A2D1E" sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
              Event Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">Manage and assign event heads</Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={() => setOpen(true)}
            fullWidth={isMobile}
            sx={{ borderRadius: "12px", px: 4, py: 1.5, bgcolor: "#7F4F24", fontWeight: 700, "&:hover": { bgcolor: "#582F0E" } }}
          >
            Add Event
          </Button>
        </Box>

        {/* EVENTS GRID */}
        {/* Changed container properties to ensure spacing works correctly */}
        <Grid container spacing={4} sx={{ width: '100%', margin: 0 }}>
          <AnimatePresence mode="popLayout">
            {events.map((event) => (
              <Grid 
                item xs={12} sm={6} lg={4} 
                key={event._id} 
                component={motion.div} 
                layout 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex' }} // Force items to take up full height of the row
              >
                <Paper elevation={0} sx={{ 
                  p: 3, 
                  borderRadius: "24px", 
                  width: "100%", // Critical: ensure paper fills the grid item width
                  display: "flex", 
                  flexDirection: "column",
                  background: "rgba(255, 255, 255, 0.7)", 
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(127, 79, 36, 0.1)",
                  boxShadow: "0 10px 30px -10px rgba(94, 64, 35, 0.1)",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "translateY(-4px)" }
                }}>
                  <Chip label={event.category} size="small" sx={{ mb: 2, width: "fit-content", bgcolor: "rgba(127, 79, 36, 0.1)", color: "#7F4F24", fontWeight: 700 }} />
                  
                  <Typography variant="h6" fontWeight={800} color="#3A2D1E" gutterBottom sx={{ 
                    lineHeight: 1.3,
                    mb: 1
                  }}>
                    {event.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ 
                    mb: 3, 
                    flexGrow: 1, 
                    lineHeight: 1.6,
                    display: '-webkit-box', 
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden' 
                  }}>
                    {event.description}
                  </Typography>

                  <Divider sx={{ mb: 2.5, opacity: 0.5 }} />

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: "#582F0E" }}>
                      <CalendarToday sx={{ fontSize: 18, opacity: 0.8 }} />
                      <Typography variant="body2" fontWeight={600}>{event.date?.slice(0, 10)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: "#582F0E" }}>
                      <LocationOn sx={{ fontSize: 18, opacity: 0.8 }} />
                      <Typography variant="body2" fontWeight={600} sx={{ 
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' 
                      }}>
                        {event.venue}
                      </Typography>
                    </Box>
                  </Box>

                  {/* ASSIGNMENT STATUS */}
                  <Box sx={{ mt: 'auto' }}>
                    {event.head ? (
                      <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: "#E8F5E9", display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star sx={{ color: "#2E7D32", fontSize: 20 }} />
                        <Typography variant="body2" fontWeight={700} color="#2E7D32" noWrap>Head: {event.head.name}</Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {event.req?.length > 0 && (
                          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 0.5, letterSpacing: 0.5 }}>PENDING REQUESTS</Typography>
                        )}
                        {event.req?.map((user) => (
                          <Box key={user._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, border: '1px solid rgba(127, 79, 36, 0.08)', borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.4)' }}>
                            <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: '60%' }}>{user.name}</Typography>
                            <Button size="small" variant="contained" disableElevation onClick={() => handleAccept(event._id, user._id)} sx={{ bgcolor: "#7F4F24", fontSize: "0.65rem", borderRadius: "8px", textTransform: 'none' }}>Assign</Button>
                          </Box>
                        ))}
                        {(!event.req || event.req.length === 0) && (
                          <Typography variant="caption" color="text.disabled" sx={{ fontStyle: 'italic' }}>No active requests</Typography>
                        )}
                      </Box>
                    )}
                  </Box>
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
          fullScreen={isMobile}
          maxWidth="xs"
          PaperProps={{ sx: { borderRadius: isMobile ? 0 : "28px", p: isMobile ? 1 : 2 } }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight={900} color="#3A2D1E">New Event</Typography>
              <IconButton onClick={() => setOpen(false)} sx={{ color: '#3A2D1E' }}><Close /></IconButton>
            </Box>

            <TextField label="Title" fullWidth sx={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} margin="normal" />
            <TextField label="Description" multiline rows={3} fullWidth sx={inputStyle} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} margin="normal" />
            
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12} sm={6}>
                <TextField label="Date" type="date" fullWidth sx={inputStyle} InputLabelProps={{ shrink: true }} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Time" fullWidth sx={inputStyle} placeholder="HH:MM AM/PM" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
              </Grid>
            </Grid>

            <TextField label="Venue" fullWidth sx={inputStyle} value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} margin="normal" />

            <Button fullWidth variant="contained" disableElevation onClick={handleCreate} sx={{ mt: 4, py: 2, borderRadius: "14px", bgcolor: "#7F4F24", fontWeight: 800, "&:hover": { bgcolor: "#582F0E" }, textTransform: 'none', fontSize: '1rem' }}>
              Launch Event
            </Button>
          </Box>
        </Dialog>
      </Container>
    </Box>
  );
}