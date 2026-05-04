// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Paper,
//   Dialog,
//   TextField,
//   MenuItem,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Events() {
//   const [open, setOpen] = useState(false);
//   const [events, setEvents] = useState([]);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     category: "one-min",
//     date: "",
//     time: "",
//     venue: "",
//   });

//   const token = localStorage.getItem("token");

//   // ✅ FETCH EVENTS
//   const fetchEvents = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/events", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setEvents(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // ✅ CREATE EVENT
//   const handleCreate = async () => {
//     if (!form.title || !form.category || !form.date) {
//       alert("Please fill required fields");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/events/create", form, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setOpen(false);

//       setForm({
//         title: "",
//         description: "",
//         category: "one-min",
//         date: "",
//         time: "",
//         venue: "",
//       });

//       fetchEvents();
//     } catch (err) {
//       console.error("ERROR:", err.response?.data || err.message);
//     }
//   };
//   const handleAccept = async (eventId, userId) => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/events/req-accepted",
//         { eventId, userId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       alert("Head assigned ✅");
//       fetchEvents();
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     }
//   };
//   return (
//     <Box>
//       <Typography variant="h5" fontWeight={700} mb={3}>
//         Events
//       </Typography>

//       {/* ADD BUTTON */}
//       <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
//         <Button variant="contained" onClick={() => setOpen(true)}>
//           + Add Event
//         </Button>
//       </Box>

//       {/* EVENTS LIST */}
//       <Grid container spacing={3}>
//         {events.map((event) => (
//           <Grid item xs={12} md={4} key={event._id}>
//             <Paper sx={{ p: 2 }}>
//               <Typography fontWeight={600}>{event.title}</Typography>
//               <Typography>{event.description}</Typography>
//               <Typography>📅 {event.date?.slice(0, 10)}</Typography>
//               <Typography>⏰ {event.time}</Typography>
//               <Typography>📍 {event.venue}</Typography>
//               <Typography>📂 {event.category}</Typography>

//               {/* ✅ SHOW CURRENT HEAD */}
//               {event.head && (
//                 <Typography mt={1} color="green">
//                   ⭐ Head: {event.head.name}
//                 </Typography>
//               )}

//               {/* ✅ REQUESTS SECTION */}
//               {event.req?.length > 0 && !event.head && (
//                 <Box mt={2}>
//                   <Typography fontWeight={600}>Requests:</Typography>

//                   {event.req.map((user) => (
//                     <Box key={user._id} mt={1}>
//                       <Typography variant="body2">👤 {user.name}</Typography>

//                       <Button
//                         variant="outlined"
//                         size="small"
//                         sx={{ mt: 1 }}
//                         onClick={() => handleAccept(event._id, user._id)}
//                       >
//                         Accept
//                       </Button>
//                     </Box>
//                   ))}
//                 </Box>
//               )}
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* POPUP FORM */}
//       <Dialog
//         open={open}
//         onClose={() => setOpen(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <Box sx={{ p: 3, maxHeight: "80vh", overflowY: "auto" }}>
//           <Typography fontWeight={600} mb={2}>
//             Create Event
//           </Typography>

//           <TextField
//             label="Title"
//             fullWidth
//             margin="dense"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//           />

//           <TextField
//             label="Description"
//             fullWidth
//             margin="dense"
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//           />

//           {/* ✅ CATEGORY */}
//           <TextField
//             select
//             label="Category"
//             fullWidth
//             margin="dense"
//             value={form.category}
//             onChange={(e) => setForm({ ...form, category: e.target.value })}
//           >
//             <MenuItem value="one-min">One Min</MenuItem>
//             <MenuItem value="main-theme">Main Theme</MenuItem>
//             <MenuItem value="Indoor games">Indoor Games</MenuItem>
//             <MenuItem value="outdoor games">Outdoor Games</MenuItem>
//           </TextField>

//           {/* ✅ DATE FIXED */}
//           <TextField
//             label="Date"
//             type="date"
//             fullWidth
//             margin="dense"
//             InputLabelProps={{ shrink: true }} // ⭐ IMPORTANT FIX
//             value={form.date}
//             onChange={(e) => setForm({ ...form, date: e.target.value })}
//           />

//           <TextField
//             label="Time"
//             fullWidth
//             margin="dense"
//             value={form.time}
//             onChange={(e) => setForm({ ...form, time: e.target.value })}
//           />

//           <TextField
//             label="Venue"
//             fullWidth
//             margin="dense"
//             value={form.venue}
//             onChange={(e) => setForm({ ...form, venue: e.target.value })}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             sx={{ mt: 2 }}
//             onClick={handleCreate}
//           >
//             Save Event
//           </Button>
//         </Box>
//       </Dialog>
//     </Box>
//   );
// }
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
} from "@mui/material";
import {
  Add,
  CalendarToday,
  AccessTime,
  LocationOn,
  Star,
  Close,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, useMediaQuery } from "@mui/material";

export default function Events() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "one-min",
    date: "",
    time: "",
    venue: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const token = localStorage.getItem("token");

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
    },
  };

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

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreate = async () => {
    if (!form.title || !form.date) {
      alert("Fill required fields");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/events/create",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOpen(false);
      setForm({
        title: "",
        description: "",
        category: "one-min",
        date: "",
        time: "",
        venue: "",
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4">Event Dashboard</Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Add Event
        </Button>
      </Box>

      {/* EVENTS LIST */}
      <Grid container spacing={3}>
        <AnimatePresence>
          {events.map((event) => (
            <Grid
              item
              xs={12}
              md={4}
              key={event._id}
              component={motion.div}
              layout
            >
              <Paper sx={{ p: 2 }}>
                <Chip label={event.category} />

                <Typography variant="h6">{event.title}</Typography>

                <Typography variant="body2">
                  {event.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography>
                  <CalendarToday fontSize="small" />{" "}
                  {event.date?.slice(0, 10)}
                </Typography>

                <Typography>
                  <AccessTime fontSize="small" /> {event.time}
                </Typography>

                <Typography>
                  <LocationOn fontSize="small" /> {event.venue}
                </Typography>

                {event.head && (
                  <Box sx={{ mt: 2 }}>
                    <Star /> Head: {event.head.name}
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {/* SINGLE CLEAN DIALOG */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        fullScreen={isMobile}
        maxWidth="xs"
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6">New Event</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <TextField
            label="Title"
            fullWidth
            sx={inputStyle}
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            margin="dense"
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={2}
            sx={inputStyle}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            margin="dense"
          />

          <TextField
            select
            label="Category"
            fullWidth
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            margin="dense"
          >
            <MenuItem value="one-min">One Min</MenuItem>
            <MenuItem value="main-theme">Main Theme</MenuItem>
          </TextField>

          <TextField
            type="date"
            fullWidth
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            margin="dense"
          />

          <TextField
            label="Time"
            fullWidth
            value={form.time}
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
            margin="dense"
          />

          <TextField
            label="Venue"
            fullWidth
            value={form.venue}
            onChange={(e) =>
              setForm({ ...form, venue: e.target.value })
            }
            margin="dense"
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleCreate}
            sx={{ mt: 2 }}
          >
            Launch Event
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}