// // import { Typography, Box } from "@mui/material";
// // import Navbar from "../Component/Navbar";
// // import bgImage from "../assets/Roobaroo.jpeg";
// // import Footer from "../Component/Footer";
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import EventCard from "../Component/EventCard";
// // import ParticipantForm from "../Component/ParticipantForm";

// // export default function Homepage() {
// //   const [events, setEvents] = useState([]);
// //   const [selectedEventId, setSelectedEventId] = useState(null); // ✅ ADD THIS

// //   useEffect(() => {
// //     fetchEvents();
// //   }, []);

// //   const fetchEvents = async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       const res = await axios.get("http://localhost:5000/api/events", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       setEvents(res.data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <>
// //       <Navbar />

// //       {/* HERO */}
// //       <Box
// //         sx={{
// //           height: "90vh",
// //           display: "flex",
// //           flexDirection: "column",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           textAlign: "center",
// //           background:
// //             "linear-gradient(180deg, #F5E6CC 0%, #DDB892 45%, #B6AD90 100%)",
// //           position: "relative",
// //           overflow: "hidden",
// //         }}
// //       >
// //         <Box
// //           sx={{
// //             position: "absolute",
// //             width: "500px",
// //             height: "500px",
// //             background:
// //               "radial-gradient(circle, rgba(201,107,44,0.18) 0%, rgba(255,255,255,0) 70%)",
// //             top: "-120px",
// //             right: "-100px",
// //             borderRadius: "50%",
// //           }}
// //         />

// //         <Box
// //           sx={{
// //             position: "absolute",
// //             width: "1500px",
// //             height: "800px",
// //             backgroundImage: `url(${bgImage})`,
// //             backgroundSize: "cover",
// //             backgroundRepeat: "no-repeat",
// //             opacity: 0.18,
// //             top: "50%",
// //             left: "50%",
// //             transform: "translate(-50%, -50%)",
// //             zIndex: 1,
// //             borderRadius: "25px",
// //           }}
// //         />

// //         <Typography
// //           variant="h3"
// //           sx={{
// //             fontFamily: "'Times New Roman', serif",
// //             fontWeight: 700,
// //             color: "#7F4F24",
// //             zIndex: 2,
// //           }}
// //         >
// //           RooBaRoo — Where Every Moment Becomes a Memory
// //         </Typography>

// //         <Typography
// //           variant="h6"
// //           sx={{
// //             color: "#F5E6CC",
// //             mt: 2,
// //             zIndex: 2,
// //           }}
// //         >
// //           Celebrate culture, creativity, and unforgettable experiences.
// //         </Typography>
// //       </Box>

// //       {/* EVENTS SECTION */}
// //       <Box sx={{ p: 5, background: "#FDFCFB" }}>
// //         <Typography
// //           variant="h4"
// //           fontWeight={800}
// //           textAlign="center"
// //           mb={4}
// //           color="#582F0E"
// //         >
// //           Explore Events
// //         </Typography>

// //         <Box
// //           sx={{
// //             display: "flex",
// //             flexWrap: "wrap",
// //             gap: 4,
// //             justifyContent: "center",
// //           }}
// //         >
// //           {events.length === 0 ? (
// //             <Typography>No events available</Typography>
// //           ) : (
// //             events.map((event) => (
// //               <EventCard
// //                 key={event._id}
// //                 event={event}
// //                 onRegister={(id) => setSelectedEventId(id)} // ✅ IMPORTANT
// //               />
// //             ))
// //           )}
// //         </Box>
// //       </Box>

// //       {/* ✅ FORM SHOW BELOW EVENTS */}
// //       {selectedEventId && (
// //         <Box sx={{ px: 3, pb: 5 }}>
// //           <ParticipantForm eventId={selectedEventId} />
// //         </Box>
// //       )}

// //       <Footer />
// //     </>
// //   );
// // }

// import { Typography, Box } from "@mui/material";
// import Navbar from "../Component/Navbar";
// import Footer from "../Component/Footer";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import EventCard from "../Component/EventCard";
// import EventDetailsModal from "../Component/EventDetailsModel";
// import ParticipantForm from "../Component/ParticipantForm";

// export default function Homepage() {
//   const [events, setEvents] = useState([]);
//   const [selectedEventId, setSelectedEventId] = useState(null);
//   const [modalEventId, setModalEventId] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     const token = localStorage.getItem("token");
//     const res = await axios.get("http://localhost:5000/api/events", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setEvents(res.data);
//   };

//   return (
//     <>
//       <Navbar />

//       {/* EVENTS */}
//       <Box sx={{ p: 5 }}>
//         <Typography variant="h4" textAlign="center" mb={4}>
//           Explore Events
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: 4,
//             justifyContent: "center",
//           }}
//         >
//           {events.map((event) => (
//             <EventCard
//               key={event._id}
//               event={event}
//               onView={(id) => setModalEventId(id)} // ✅ open modal
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* ✅ MODAL */}
//       <EventDetailsModal
//         open={!!modalEventId}
//         eventId={modalEventId}
//         handleClose={() => setModalEventId(null)}
//         onRegister={(id) => setSelectedEventId(id)} // ✅ trigger form
//       />

//       {/* ✅ FORM BELOW EVENTS */}
//       {selectedEventId && (
//         <Box sx={{ px: 3, pb: 5 }}>
//           <ParticipantForm eventId={selectedEventId} />
//         </Box>
//       )}

//       <Footer />
//     </>
//   );
// }

import { Typography, Box } from "@mui/material";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import EventCard from "../Component/EventCard";
import EventDetailsModal from "../Component/EventDetailsModel";
import ParticipantForm from "../Component/ParticipantForm";

export default function Homepage() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [modalEventId, setModalEventId] = useState(null);

  const formRef = useRef(null); // ✅ scroll ref

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/events", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvents(res.data);
  };

  // ✅ REGISTER HANDLER WITH SCROLL
  const handleRegister = (id) => {
    setSelectedEventId(id);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <>
      <Navbar />

      {/* EVENTS */}
      <Box sx={{ p: 5 }}>
        <Typography variant="h4" textAlign="center" mb={4}>
          Explore Events
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onView={(id) => setModalEventId(id)}
            />
          ))}
        </Box>
      </Box>

      {/* MODAL */}
      <EventDetailsModal
        open={!!modalEventId}
        eventId={modalEventId}
        handleClose={() => setModalEventId(null)}
        onRegister={handleRegister} // ✅ IMPORTANT
      />

      {/* FORM */}
      {selectedEventId && (
        <Box ref={formRef} sx={{ px: 3, pb: 5 }}>
          <ParticipantForm eventId={selectedEventId} />
        </Box>
      )}

      <Footer />
    </>
  );
}
