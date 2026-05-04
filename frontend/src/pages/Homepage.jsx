import { 
  Typography, 
  Box, 
  Container, // ✅ Added
  Grid, 
  Fade, 
  Paper // ✅ Added
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

// Components
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import EventCard from "../Component/EventCard";
import EventDetailsModal from "../Component/EventDetailsModel";
import ParticipantForm from "../Component/ParticipantForm";

// Assets
import bgImage from "../assets/Roobaroo.jpeg";

export default function Homepage() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [modalEventId, setModalEventId] = useState(null);
  const formRef = useRef(null);

  const fetchEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleRegister = (id) => {
    if (!id) return;
    setSelectedEventId(id);
    
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 400);
  };

  return (
    <Box sx={{ bgcolor: "#FDFCFB", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero Section */}
      <Box sx={{ height: "85vh", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", background: "linear-gradient(135deg, #F5E6CC 0%, #DDB892 100%)", position: "relative", overflow: "hidden", px: 2 }}>
        <Box sx={{ position: "absolute", width: "100%", height: "100%", backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1, zIndex: 1 }} />
        <Box sx={{ zIndex: 2, p: 4, borderRadius: 4, backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.3)" }}>
          <Typography variant="h2" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: "#582F0E", mb: 2, fontSize: { xs: "2.5rem", md: "4rem" } }}>RooBaRoo</Typography>
          <Typography variant="h5" sx={{ color: "#7F4F24", fontWeight: 500, maxWidth: "700px", lineHeight: 1.6 }}>Where Every Moment Becomes a Memory.</Typography>
        </Box>
      </Box>

      {/* Events Grid */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight={800} color="#3A2D1E" sx={{ fontFamily: "'Playfair Display', serif" }}>Explore Events</Typography>
          <Box sx={{ width: "80px", height: "4px", bgcolor: "#DDB892", mx: "auto", mt: 1, borderRadius: 2 }} />
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {events.length === 0 ? (
            <Typography variant="h6" color="textSecondary">Loading events...</Typography>
          ) : (
            events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <motion.div whileHover={{ y: -10 }}>
                  <EventCard event={event} onView={(id) => setModalEventId(id)} />
                </motion.div>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      <EventDetailsModal
        open={Boolean(modalEventId)}
        eventId={modalEventId}
        handleClose={() => setModalEventId(null)}
        onRegister={handleRegister} 
      />

      {/* Form Section */}
      <AnimatePresence>
        {selectedEventId && (
          <Fade in={Boolean(selectedEventId)} timeout={800}>
            <Box ref={formRef} sx={{ py: 10, bgcolor: "#F5E6CC" }}>
              <Container maxWidth="md">
                <Paper elevation={6} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, bgcolor: "white" }}>
                  <ParticipantForm eventId={selectedEventId} />
                </Paper>
              </Container>
            </Box>
          </Fade>
        )}
      </AnimatePresence>

      <Footer />
    </Box>
  );
}