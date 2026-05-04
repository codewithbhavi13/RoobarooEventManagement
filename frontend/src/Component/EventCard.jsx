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
} from "@mui/material";

export default function EventCard({ event, onView }) {
  return (
    <Card
      sx={{
        width: 320,
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        transition: "0.3s",
        background: "#fff",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
        },
      }}
    >
      <CardMedia component="img" height="200" image={event.image} />

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {event.title}
        </Typography>

        <Typography sx={{ mb: 2 }}>{event.description}</Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>{new Date(event.date).toLocaleDateString()}</Typography>
          <Typography>₹{event.entryFee || 0}</Typography>
          <Typography>{event.category}</Typography>
        </Box>

        <Button fullWidth variant="contained" onClick={() => onView(event._id)}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
