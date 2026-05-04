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
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EventDetailsModal({
  open,
  handleClose,
  eventId,
  onRegister,
}) {
  const [event, setEvent] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (open) fetchEvent();
  }, [open]);

  const fetchEvent = async () => {
    const res = await axios.get(`http://localhost:5000/api/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvent(res.data);
  };

  if (!event) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ position: "relative" }}>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <Close />
        </IconButton>

        <Typography variant="h5">{event.title}</Typography>
        <Typography>{event.description}</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography>📅 {event.date?.slice(0, 10)}</Typography>
        <Typography>💰 ₹{event.entryFee}</Typography>
        <Typography>📍 {event.venue}</Typography>

        {event.head && (
          <Typography mt={2}>⭐ Head: {event.head.name}</Typography>
        )}

        <Box mt={2}>
          <Typography fontWeight={700}>Rules:</Typography>
          {event.rules?.map((r, i) => (
            <Typography key={i}>
              {i + 1}. {r}
            </Typography>
          ))}
        </Box>

        <Button
          fullWidth
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => {
            handleClose();
            onRegister(event._id); // ✅ triggers scroll + form
          }}
        >
          Register
        </Button>
      </DialogContent>
    </Dialog>
  );
}
