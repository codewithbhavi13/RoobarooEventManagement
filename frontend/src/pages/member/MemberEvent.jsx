import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Avatar,
  Divider,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { 
  CalendarToday, 
  LocationOn, 
  AccessTime, 
  Star, 
  HourglassEmpty, 
  ChevronRight,
  EmojiEvents
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";

export default function MemberEvent() {
  const [events, setEvents] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const userId = user?.id;

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

  useEffect(() => { fetchEvents(); }, []);

  const handleRequest = async (eventId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/events/req-event-admin",
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchEvents();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #FDFCFB 0%, #F3E9DC 100%)",
      py: { xs: 4, md: 6 } 
    }}>
      <Container maxWidth="lg">
        
        {/* HEADER SECTION */}
        <Box sx={{ mb: 6, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h3" fontWeight={900} color="#3A2D1E" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 1 }}>
            Explore Events
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <AnimatePresence>
            {events.map((event, index) => {
              const isHead = event.head?._id === userId || event.head === userId;
              const hasRequested = event.req?.includes(userId);
              const isTaken = event.head && !isHead;

              return (
                <Grid 
                  item xs={12} sm={6} lg={4} 
                  key={event._id}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={{ display: 'flex' }}
                >
                  <Paper elevation={0} sx={{ 
                    p: 3, 
                    borderRadius: "28px", 
                    width: "100%",
                    display: "flex", 
                    flexDirection: "column",
                    background: "rgba(255, 255, 255, 0.8)", 
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(127, 79, 36, 0.12)",
                    boxShadow: "0 10px 40px -10px rgba(94, 64, 35, 0.08)",
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* CATEGORY CHIP */}
                    <Chip 
                      label={event.category || "General"} 
                      size="small" 
                      sx={{ 
                        mb: 2, 
                        width: "fit-content", 
                        bgcolor: "rgba(127, 79, 36, 0.08)", 
                        color: "#7F4F24", 
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: '0.65rem'
                      }} 
                    />
                    
                    <Typography variant="h5" fontWeight={800} color="#3A2D1E" gutterBottom>
                      {event.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ 
                      mb: 3, flexGrow: 1, lineHeight: 1.6, 
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' 
                    }}>
                      {event.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: "#582F0E" }}>
                        <CalendarToday sx={{ fontSize: 18, opacity: 0.7 }} />
                        <Typography variant="body2" fontWeight={600}>{event.date?.slice(0, 10)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: "#582F0E" }}>
                        <LocationOn sx={{ fontSize: 18, opacity: 0.7 }} />
                        <Typography variant="body2" fontWeight={600} noWrap>{event.venue}</Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ mb: 3, opacity: 0.5 }} />

                    {/* DYNAMIC ACTION BUTTON */}
                    <Box>
                      {isHead ? (
                        <Button 
                          fullWidth 
                          variant="contained" 
                          startIcon={<EmojiEvents />}
                          sx={{ 
                            bgcolor: "#2E7D32", 
                            borderRadius: "14px", 
                            py: 1.5, 
                            fontWeight: 800,
                            pointerEvents: 'none'
                          }}
                        >
                          You are the Head
                        </Button>
                      ) : isTaken ? (
                        <Button 
                          fullWidth 
                          disabled 
                          startIcon={<Star />}
                          sx={{ borderRadius: "14px", py: 1.5, fontWeight: 700, bgcolor: "rgba(0,0,0,0.05) !important" }}
                        >
                          Head Assigned
                        </Button>
                      ) : hasRequested ? (
                        <Button 
                          fullWidth 
                          disabled 
                          startIcon={<HourglassEmpty />}
                          sx={{ borderRadius: "14px", py: 1.5, fontWeight: 700, color: "#7F4F24 !important" }}
                        >
                          Pending Approval
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          variant="contained"
                          endIcon={<ChevronRight />}
                          onClick={() => handleRequest(event._id)}
                          sx={{ 
                            bgcolor: "#7F4F24", 
                            borderRadius: "14px", 
                            py: 1.5, 
                            fontWeight: 800,
                            "&:hover": { bgcolor: "#582F0E", transform: 'scale(1.02)' },
                            transition: 'all 0.2s'
                          }}
                        >
                          Apply for Head
                        </Button>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </AnimatePresence>
        </Grid>
      </Container>
    </Box>
  );
}