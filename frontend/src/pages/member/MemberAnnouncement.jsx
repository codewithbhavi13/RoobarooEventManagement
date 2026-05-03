import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Avatar,
  Divider,
  Container,
} from "@mui/material";
import { 
  Campaign, 
  Public, 
  EventAvailable, 
  AccessTime, 
  NotificationsActive 
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";

export default function MemberAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const myEvents = res.data
        .filter(
          (e) =>
            e.participants?.some((p) => p._id === user?.id) ||
            e.head === user?.id ||
            e.head?._id === user?.id
        )
        .map((e) => e._id);

      setEvents(myEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/events/announcement",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const filtered = res.data.announcements.filter(
        (a) => a.event === null || events.includes(a.event?._id)
      );

      setAnnouncements(filtered);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    // Fetch announcements even if user has no events (to see Global ones)
    fetchAnnouncements();
  }, [events]);

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #FDFCFB 0%, #F3E9DC 100%)",
      py: { xs: 3, md: 5 } 
    }}>
      <Container maxWidth="md">
        
        {/* HEADER */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 5, gap: 2 }}>
          <Avatar sx={{ bgcolor: "#7F4F24", width: 50, height: 50, boxShadow: 3 }}>
            <NotificationsActive />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={900} color="#3A2D1E" sx={{ letterSpacing: "-0.5px" }}>
              Latest Updates
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stay informed about your events and community news
            </Typography>
          </Box>
        </Box>

        {/* FEED */}
        <Grid container spacing={3}>
          <AnimatePresence>
            {announcements.length > 0 ? (
              announcements.map((a, index) => (
                <Grid 
                  item xs={12} 
                  key={a._id}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Paper elevation={0} sx={{ 
                    p: { xs: 2, sm: 3 }, 
                    borderRadius: "24px", 
                    background: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(127, 79, 36, 0.1)",
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 30px rgba(127,79,36,0.08)" }
                  }}>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {a.event ? (
                          <Chip 
                            icon={<EventAvailable sx={{ fontSize: '1rem !important' }} />} 
                            label={a.event.title} 
                            size="small" 
                            sx={{ borderRadius: '8px', bgcolor: 'rgba(127, 79, 36, 0.1)', color: '#7F4F24', fontWeight: 700 }} 
                          />
                        ) : (
                          <Chip 
                            icon={<Public sx={{ fontSize: '1rem !important' }} />} 
                            label="Global Announcement" 
                            size="small" 
                            sx={{ borderRadius: '8px', bgcolor: 'rgba(0, 150, 136, 0.1)', color: '#00796B', fontWeight: 700 }} 
                          />
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled' }}>
                        <AccessTime sx={{ fontSize: 16 }} />
                        <Typography variant="caption" fontWeight={600}>
                          {new Date(a.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="h6" fontWeight={800} color="#3A2D1E" gutterBottom>
                      {a.title}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {a.message}
                    </Typography>

                    <Divider sx={{ mb: 2, borderStyle: 'dashed', opacity: 0.5 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: '#7F4F24' }}>
                        {a.createdBy?.name?.charAt(0) || "A"}
                      </Avatar>
                      <Box>
                        <Typography variant="caption" fontWeight={700} display="block">
                          {a.createdBy?.name || "Admin"}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          {new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      </Box>
                    </Box>

                  </Paper>
                </Grid>
              ))
            ) : (
              <Box sx={{ width: '100%', textAlign: 'center', py: 10, opacity: 0.5 }}>
                <Campaign sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6">No announcements for you yet.</Typography>
              </Box>
            )}
          </AnimatePresence>
        </Grid>
      </Container>
    </Box>
  );
}