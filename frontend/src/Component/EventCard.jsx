// // // // import {
// // // //   Card,
// // // //   CardMedia,
// // // //   CardContent,
// // // //   Typography,
// // // //   Button,
// // // //   Box,
// // // // } from "@mui/material";
// // // // import { useNavigate } from "react-router-dom";
// // // // export default function EventCard({ event }) {
// // // //   const navigate = useNavigate();
// // // //   return (
// // // //     <Card
// // // //       sx={{
// // // //         width: 320,
// // // //         borderRadius: "18px",
// // // //         overflow: "hidden",
// // // //         boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
// // // //         transition: "0.3s",
// // // //         background: "#fff",

// // // //         "&:hover": {
// // // //           transform: "translateY(-6px)",
// // // //           boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
// // // //         },
// // // //       }}
// // // //     >
// // // //       {/* EVENT IMAGE */}
// // // //       <CardMedia
// // // //         component="img"
// // // //         height="200"
// // // //         image={event.image}
// // // //         alt={event.title}
// // // //       />

// // // //       {/* CONTENT */}
// // // //       <CardContent>
// // // //         {/* TITLE */}
// // // //         <Typography
// // // //           variant="h6"
// // // //           sx={{
// // // //             fontWeight: 700,
// // // //             color: "#582F0E",
// // // //             mb: 1,
// // // //           }}
// // // //         >
// // // //           {event.title}
// // // //         </Typography>

// // // //         {/* DESCRIPTION */}
// // // //         <Typography
// // // //           variant="body2"
// // // //           sx={{
// // // //             color: "#555",
// // // //             mb: 2,
// // // //             minHeight: "60px",
// // // //           }}
// // // //         >
// // // //           {event.description}
// // // //         </Typography>

// // // //         {/* DATE + CATEGORY */}
// // // //         {/* DATE + FEE + CATEGORY */}
// // // //         <Box
// // // //           sx={{
// // // //             display: "flex",
// // // //             justifyContent: "space-between",
// // // //             alignItems: "center",
// // // //             mb: 2,
// // // //           }}
// // // //         >
// // // //           {/* DATE */}
// // // //           <Typography
// // // //             sx={{
// // // //               fontSize: "0.9rem",
// // // //               color: "#936639",
// // // //               fontWeight: 600,
// // // //             }}
// // // //           >
// // // //             {new Date(event.date).toLocaleDateString()}
// // // //           </Typography>

// // // //           {/* ENTRY FEE */}
// // // //           <Typography
// // // //             sx={{
// // // //               fontSize: "0.85rem",
// // // //               fontWeight: 700,
// // // //               color: "#582F0E",
// // // //             }}
// // // //           >
// // // //             ₹{event.entryFee || 0}
// // // //           </Typography>

// // // //           {/* CATEGORY */}
// // // //           <Typography
// // // //             sx={{
// // // //               fontSize: "0.85rem",
// // // //               background: "#F5E6CC",
// // // //               color: "#7F4F24",
// // // //               px: 1.5,
// // // //               py: 0.4,
// // // //               borderRadius: "20px",
// // // //             }}
// // // //           >
// // // //             {event.category}
// // // //           </Typography>
// // // //         </Box>

// // // //         {/* BUTTON */}
// // // //         <Button
// // // //           fullWidth
// // // //           variant="contained"
// // // //           onClick={() => navigate(`/event/${event._id}`)}
// // // //           sx={{
// // // //             borderRadius: "30px",
// // // //             py: 1,
// // // //             fontWeight: 600,
// // // //             background: "linear-gradient(135deg, #936639 0%, #7F4F24 100%)",

// // // //             "&:hover": {
// // // //               background: "linear-gradient(135deg, #7F4F24 0%, #582F0E 100%)",
// // // //             },

// // // //           }}
// // // //         >
// // // //           Register Now
// // // //         </Button>
// // // //       </CardContent>
// // // //     </Card>
// // // //   );
// // // // }

// // // import {
// // //   Card,
// // //   CardMedia,
// // //   CardContent,
// // //   Typography,
// // //   Button,
// // //   Box,
// // // } from "@mui/material";
// // // import { useState } from "react";
// // // import EventDetailsModal from "./EventDetailsModel"; // ✅ import modal

// // // export default function EventCard({ event }) {
// // //   const [open, setOpen] = useState(false);

// // //   return (
// // //     <>
// // //       <Card
// // //         sx={{
// // //           width: 320,
// // //           borderRadius: "18px",
// // //           overflow: "hidden",
// // //           boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
// // //           transition: "0.3s",
// // //           background: "#fff",

// // //           "&:hover": {
// // //             transform: "translateY(-6px)",
// // //             boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
// // //           },
// // //         }}
// // //       >
// // //         {/* EVENT IMAGE */}
// // //         <CardMedia
// // //           component="img"
// // //           height="200"
// // //           image={event.image}
// // //           alt={event.title}
// // //         />

// // //         {/* CONTENT */}
// // //         <CardContent>
// // //           {/* TITLE */}
// // //           <Typography
// // //             variant="h6"
// // //             sx={{
// // //               fontWeight: 700,
// // //               color: "#582F0E",
// // //               mb: 1,
// // //             }}
// // //           >
// // //             {event.title}
// // //           </Typography>

// // //           {/* DESCRIPTION */}
// // //           <Typography
// // //             variant="body2"
// // //             sx={{
// // //               color: "#555",
// // //               mb: 2,
// // //               minHeight: "60px",
// // //             }}
// // //           >
// // //             {event.description}
// // //           </Typography>

// // //           {/* DATE + FEE + CATEGORY */}
// // //           <Box
// // //             sx={{
// // //               display: "flex",
// // //               justifyContent: "space-between",
// // //               alignItems: "center",
// // //               mb: 2,
// // //             }}
// // //           >
// // //             {/* DATE */}
// // //             <Typography
// // //               sx={{
// // //                 fontSize: "0.9rem",
// // //                 color: "#936639",
// // //                 fontWeight: 600,
// // //               }}
// // //             >
// // //               {new Date(event.date).toLocaleDateString()}
// // //             </Typography>

// // //             {/* ENTRY FEE */}
// // //             <Typography
// // //               sx={{
// // //                 fontSize: "0.85rem",
// // //                 fontWeight: 700,
// // //                 color: "#582F0E",
// // //               }}
// // //             >
// // //               ₹{event.entryFee || 0}
// // //             </Typography>

// // //             {/* CATEGORY */}
// // //             <Typography
// // //               sx={{
// // //                 fontSize: "0.85rem",
// // //                 background: "#F5E6CC",
// // //                 color: "#7F4F24",
// // //                 px: 1.5,
// // //                 py: 0.4,
// // //                 borderRadius: "20px",
// // //               }}
// // //             >
// // //               {event.category}
// // //             </Typography>
// // //           </Box>

// // //           {/* BUTTON */}
// // //           <Button
// // //             fullWidth
// // //             variant="contained"
// // //             onClick={() => setOpen(true)} // ✅ OPEN POPUP
// // //             sx={{
// // //               borderRadius: "30px",
// // //               py: 1,
// // //               fontWeight: 600,
// // //               background: "linear-gradient(135deg, #936639 0%, #7F4F24 100%)",

// // //               "&:hover": {
// // //                 background: "linear-gradient(135deg, #7F4F24 0%, #582F0E 100%)",
// // //               },
// // //             }}
// // //           >
// // //             View Details
// // //           </Button>
// // //         </CardContent>
// // //       </Card>

// // //       {/* ✅ POPUP MODAL */}
// // //       <EventDetailsModal
// // //         open={open}
// // //         handleClose={() => setOpen(false)}
// // //         eventId={event._id}
// // //       />
// // //     </>
// // //   );
// // // }

// // import {
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   Typography,
// //   Button,
// //   Box,
// // } from "@mui/material";

// // export default function EventCard({ event, onRegister }) {
// //   return (
// //     <Card
// //       sx={{
// //         width: 320,
// //         borderRadius: "18px",
// //         overflow: "hidden",
// //         boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
// //         transition: "0.3s",
// //         background: "#fff",
// //         "&:hover": {
// //           transform: "translateY(-6px)",
// //           boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
// //         },
// //       }}
// //     >
// //       <CardMedia
// //         component="img"
// //         height="200"
// //         image={event.image}
// //         alt={event.title}
// //       />

// //       <CardContent>
// //         <Typography
// //           variant="h6"
// //           sx={{ fontWeight: 700, color: "#582F0E", mb: 1 }}
// //         >
// //           {event.title}
// //         </Typography>

// //         <Typography
// //           variant="body2"
// //           sx={{ color: "#555", mb: 2, minHeight: "60px" }}
// //         >
// //           {event.description}
// //         </Typography>

// //         <Box
// //           sx={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             mb: 2,
// //           }}
// //         >
// //           <Typography
// //             sx={{ fontSize: "0.9rem", color: "#936639", fontWeight: 600 }}
// //           >
// //             {new Date(event.date).toLocaleDateString()}
// //           </Typography>

// //           <Typography sx={{ fontSize: "0.85rem", fontWeight: 700 }}>
// //             ₹{event.entryFee || 0}
// //           </Typography>

// //           <Typography
// //             sx={{
// //               fontSize: "0.85rem",
// //               background: "#F5E6CC",
// //               px: 1.5,
// //               py: 0.4,
// //               borderRadius: "20px",
// //             }}
// //           >
// //             {event.category}
// //           </Typography>
// //         </Box>

// //         <Button
// //           fullWidth
// //           variant="contained"
// //           onClick={() => onRegister(event._id)} // ✅ TRIGGER FORM
// //         >
// //           Register Now
// //         </Button>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   Box,
// } from "@mui/material";

// export default function EventCard({ event, onView }) {
//   return (
//     <Card
//       sx={{
//         width: 320,
//         borderRadius: "18px",
//         overflow: "hidden",
//         boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
//         transition: "0.3s",
//         background: "#fff",
//         "&:hover": {
//           transform: "translateY(-6px)",
//           boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
//         },
//       }}
//     >
//       <CardMedia component="img" height="200" image={event.image} />

//       <CardContent>
//         <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
//           {event.title}
//         </Typography>

//         <Typography sx={{ mb: 2 }}>{event.description}</Typography>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Typography>{new Date(event.date).toLocaleDateString()}</Typography>
//           <Typography>₹{event.entryFee || 0}</Typography>
//           <Typography>{event.category}</Typography>
//         </Box>

//         <Button fullWidth variant="contained" onClick={() => onView(event._id)}>
//           View Details
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { 
  CalendarMonth, 
  CurrencyRupee, 
  ArrowForwardIos,
  EmojiEvents 
} from "@mui/icons-material";

/**
 * PREVIOUS EVOLUTION NOTES (From Comments):
 * 1. Initial version: Direct navigation to event page.
 * 2. Second version: Introduced setOpen(true) for local modal handling.
 * 3. Third version: Unified with Homepage via onView callback for better state flow.
 */

export default function EventCard({ event, onView }) {
  return (
    <Card
      sx={{
        width: 320,
        borderRadius: "24px", // Smoother corners
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(127, 79, 36, 0.08)", // Softer, themed shadow
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "#ffffff",
        border: "1px solid rgba(127, 79, 36, 0.05)",
        "&:hover": {
          transform: "translateY(-12px)", // Pronounced lift
          boxShadow: "0 20px 40px rgba(127, 79, 36, 0.15)",
        },
      }}
    >
      {/* IMAGE CONTAINER WITH CATEGORY OVERLAY */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={event.image || "https://via.placeholder.com/320x180"}
          alt={event.title}
          sx={{ filter: "brightness(0.95)" }}
        />
        <Chip
          label={event.category}
          size="small"
          sx={{
            position: "absolute",
            top: 15,
            right: 15,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            color: "#7F4F24",
            fontWeight: 700,
            backdropFilter: "blur(4px)",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        />
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* TITLE & PRICE ROW */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#3A2D1E",
              lineHeight: 1.2,
              flex: 1,
              pr: 1
            }}
          >
            {event.title}
          </Typography>
          <Box display="flex" alignItems="center" sx={{ color: "#7F4F24" }}>
            <CurrencyRupee sx={{ fontSize: "1rem" }} />
            <Typography variant="h6" fontWeight={900}>
              {event.entryFee || "Free"}
            </Typography>
          </Box>
        </Box>

        {/* DESCRIPTION */}
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 2.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            height: "40px",
          }}
        >
          {event.description}
        </Typography>

        <Divider sx={{ mb: 2, opacity: 0.6 }} />

        {/* DATE & LOGISTICS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
            color: "#936639",
          }}
        >
          <CalendarMonth sx={{ fontSize: "1.1rem" }} />
          <Typography variant="body2" fontWeight={600}>
            {new Date(event.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Typography>
        </Box>

        {/* VIEW DETAILS BUTTON */}
        <Button
          fullWidth
          variant="contained"
          onClick={() => onView(event._id)}
          endIcon={<ArrowForwardIos sx={{ fontSize: "10px !important" }} />}
          sx={{
            borderRadius: "15px",
            py: 1.5,
            fontWeight: 700,
            textTransform: "none",
            bgcolor: "#7F4F24",
            boxShadow: "0 6px 20px rgba(127, 79, 36, 0.2)",
            "&:hover": {
              bgcolor: "#5E4023",
              boxShadow: "none",
            },
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}