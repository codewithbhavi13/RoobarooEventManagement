// // import {
// //   Dialog,
// //   DialogContent,
// //   Typography,
// //   Box,
// //   Button,
// //   Divider,
// //   IconButton,
// // } from "@mui/material";
// // import { Close } from "@mui/icons-material";
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import ParticipantForm from "./ParticipantForm"; // ✅ IMPORT FORM

// // export default function EventDetailsModal({ open, handleClose, eventId }) {
// //   const [event, setEvent] = useState(null);
// //   const [showForm, setShowForm] = useState(false); // ✅ TOGGLE FORM
// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     if (open) {
// //       fetchEvent();
// //       setShowForm(false); // reset when modal opens
// //     }
// //   }, [open]);

// //   const fetchEvent = async () => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:5000/api/events/${eventId}`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       );
// //       setEvent(res.data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   if (!event) return null;

// //   return (
// //     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
// //       <DialogContent sx={{ position: "relative" }}>
// //         {/* ❌ CLOSE BUTTON */}
// //         <IconButton
// //           onClick={handleClose}
// //           sx={{
// //             position: "absolute",
// //             top: 10,
// //             right: 10,
// //           }}
// //         >
// //           <Close />
// //         </IconButton>

// //         {/* ✅ IF FORM OPEN */}
// //         {showForm ? (
// //           <ParticipantForm eventId={event._id} />
// //         ) : (
// //           <>
// //             {/* TITLE */}
// //             <Typography variant="h5" fontWeight={700}>
// //               {event.title}
// //             </Typography>

// //             <Typography mt={1}>{event.description}</Typography>

// //             <Divider sx={{ my: 2 }} />

// //             {/* BASIC INFO */}
// //             <Typography>📅 {event.date?.slice(0, 10)}</Typography>
// //             <Typography>💰 ₹{event.entryFee}</Typography>
// //             <Typography>📍 {event.venue}</Typography>

// //             {/* EVENT HEAD */}
// //             {event.head && (
// //               <Typography mt={2} color="green">
// //                 ⭐ Head: {event.head.name}
// //               </Typography>
// //             )}

// //             {/* RULES */}
// //             <Box mt={3}>
// //               <Typography fontWeight={700}>Rules:</Typography>

// //               {event.rules?.length > 0 ? (
// //                 event.rules.map((rule, i) => (
// //                   <Typography key={i}>
// //                     {i + 1}. {rule}
// //                   </Typography>
// //                 ))
// //               ) : (
// //                 <Typography>No rules available</Typography>
// //               )}
// //             </Box>

// //             {/* REGISTER BUTTON */}
// //             <Button
// //               fullWidth
// //               variant="contained"
// //               sx={{ mt: 3 }}
// //               onClick={() => setShowForm(true)} // ✅ SHOW FORM
// //             >
// //               Register
// //             </Button>
// //           </>
// //         )}
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }

// import {
//   Dialog,
//   DialogContent,
//   Typography,
//   Box,
//   Button,
//   Divider,
//   IconButton,
// } from "@mui/material";
// import { Close } from "@mui/icons-material";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function EventDetailsModal({
//   open,
//   handleClose,
//   eventId,
//   onRegister,
// }) {
//   const [event, setEvent] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (open) fetchEvent();
//   }, [open]);

//   const fetchEvent = async () => {
//     const res = await axios.get(`http://localhost:5000/api/events/${eventId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setEvent(res.data);
//   };

//   if (!event) return null;

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//       <DialogContent sx={{ position: "relative" }}>
//         <IconButton
//           onClick={handleClose}
//           sx={{ position: "absolute", top: 10, right: 10 }}
//         >
//           <Close />
//         </IconButton>

//         <Typography variant="h5">{event.title}</Typography>
//         <Typography>{event.description}</Typography>

//         <Divider sx={{ my: 2 }} />

//         <Typography>📅 {event.date?.slice(0, 10)}</Typography>
//         <Typography>💰 ₹{event.entryFee}</Typography>
//         <Typography>📍 {event.venue}</Typography>

//         {event.head && (
//           <Typography mt={2}>⭐ Head: {event.head.name}</Typography>
//         )}

//         <Box mt={2}>
//           <Typography fontWeight={700}>Rules:</Typography>
//           {event.rules?.map((r, i) => (
//             <Typography key={i}>
//               {i + 1}. {r}
//             </Typography>
//           ))}
//         </Box>

//         <Button
//           fullWidth
//           sx={{ mt: 3 }}
//           variant="contained"
//           onClick={() => {
//             handleClose(); // ✅ close modal
//             onRegister(event._id); // ✅ trigger form in homepage
//           }}
//         >
//           Register
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// }

import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  Divider,
  IconButton,
  Chip,
  Stack,
  Fade,
} from "@mui/material";
import { 
  Close, 
  CalendarMonth, 
  LocationOn, 
  CurrencyRupee, 
  AccountCircle,
  Gavel,
  InfoOutlined 
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EventDetailsModel({
  open,
  handleClose,
  eventId,
  onRegister,
}) {
  const [event, setEvent] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (open && eventId) fetchEvent();
  }, [open, eventId]);

  const fetchEvent = async () => {
    // Keep your exact backend logic
    const res = await axios.get(`http://localhost:5000/api/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvent(res.data);
  };

  if (!event) return null;

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      TransitionComponent={Fade}
      PaperProps={{
        sx: { borderRadius: "28px", overflow: "hidden" }
      }}
    >
      {/* 1. VISUAL COVER SECTION */}
      <Box sx={{ position: "relative", height: "220px" }}>
        <img 
          src={event.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"} 
          alt={event.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box sx={{ 
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%", 
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8))" 
        }} />
        
        <IconButton
          onClick={handleClose}
          sx={{ 
            position: "absolute", top: 15, right: 15, 
            bgcolor: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
            color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.4)" }
          }}
        >
          <Close />
        </IconButton>

        <Box sx={{ position: "absolute", bottom: 20, left: 24 }}>
          <Chip 
            label={event.category || "General"} 
            size="small" 
            sx={{ bgcolor: "#F5E6CC", color: "#7F4F24", fontWeight: 800, mb: 1 }} 
          />
          <Typography variant="h4" fontWeight={900} color="white">
            {event.title}
          </Typography>
        </Box>
      </Box>

      <DialogContent sx={{ p: 4, bgcolor: "#FDFCFB" }}>
        
        {/* 2. DESCRIPTION SECTION */}
        <Box mb={4}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
             <InfoOutlined sx={{ fontSize: "1.2rem", color: "#7F4F24" }} />
             <Typography variant="subtitle2" fontWeight={800} color="#7F4F24" sx={{ letterSpacing: 1 }}>
               ABOUT THE EVENT
             </Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
            {event.description}
          </Typography>
        </Box>

        {/* 3. INFO GRID (DATE, FEE, VENUE) */}
        <Box sx={{ 
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, 
          bgcolor: "rgba(127, 79, 36, 0.05)", p: 2.5, borderRadius: "20px", mb: 4
        }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CalendarMonth sx={{ color: "#7F4F24" }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">DATE</Typography>
              <Typography variant="body2" fontWeight={700}>
                {event.date?.slice(0, 10)}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <CurrencyRupee sx={{ color: "#7F4F24" }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">ENTRY FEE</Typography>
              <Typography variant="body2" fontWeight={700}>₹{event.entryFee || 0}</Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <LocationOn sx={{ color: "#7F4F24" }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">VENUE</Typography>
              <Typography variant="body2" fontWeight={700}>{event.venue}</Typography>
            </Box>
          </Stack>

          {event.head && (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <AccountCircle sx={{ color: "#7F4F24" }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">EVENT HEAD</Typography>
                <Typography variant="body2" fontWeight={700}>{event.head.name}</Typography>
              </Box>
            </Stack>
          )}
        </Box>

        {/* 4. RULES SECTION */}
        <Box mb={4}>
          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <Gavel sx={{ color: "#7F4F24", fontSize: "1.2rem" }} />
            <Typography variant="subtitle2" fontWeight={800} color="#7F4F24" sx={{ letterSpacing: 1 }}>
              GUIDELINES & RULES
            </Typography>
          </Stack>
          
          <Stack spacing={1.5}>
            {event.rules?.map((rule, index) => (
              <Box key={index} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Typography variant="body2" sx={{ 
                  bgcolor: "#F5E6CC", color: "#7F4F24", px: 0.8, borderRadius: "4px", fontWeight: 900 
                }}>
                  {index + 1}
                </Typography>
                <Typography variant="body2" color="#444" fontWeight={500}>
                  {rule}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* 5. ACTION BUTTON */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={() => {
            handleClose();
            onRegister(event._id);
          }}
          sx={{
            borderRadius: "18px",
            py: 2,
            fontWeight: 900,
            textTransform: "none",
            fontSize: "1.1rem",
            bgcolor: "#7F4F24",
            boxShadow: "0 10px 30px rgba(127, 79, 36, 0.3)",
            "&:hover": { bgcolor: "#5E4023", boxShadow: "none" }
          }}
        >
          Register for this Event
        </Button>
      </DialogContent>
    </Dialog>
  );
}