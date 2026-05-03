import { Typography, Box } from "@mui/material";
import Navbar from "../Component/Navbar"; 
import bgImage from "../assets/Roobaroo.jpeg";
import Footer from "../Component/Footer";
import EventCard from "../Component/EventCard.jsx"; 
import ParticipantForm from "../Component/ParticipantForm";

export default function Homepage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "90vh",

          display: "flex",
          flexDirection: "column",

          justifyContent: "center",
          alignItems: "center",

          textAlign: "center",

          background:
            "linear-gradient(180deg, #F5E6CC 0%, #DDB892 45%, #B6AD90 100%)",

          position: "relative",

          overflow: "hidden",
        }}
      >

        {/* Soft Background Glow */}
        <Box
          sx={{
            position: "absolute",

            width: "500px",
            height: "500px",

            background:
              "radial-gradient(circle, rgba(201,107,44,0.18) 0%, rgba(255,255,255,0) 70%)",

            top: "-120px",
            right: "-100px",

            borderRadius: "50%",
          }}
        />

        {/* Background Image */}
        <Box
          sx={{
            position: "absolute",
            width: "1500px",
            height: "900px",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.18,
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            borderRadius: "25px",
          }}
        />

        {/* Hero Heading */}
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: "'Times New Roman', serif",
            fontWeight: 700,
            color: "#7F4F24",
            letterSpacing: "1px",
            maxWidth: "900px",
            px: 2,
            zIndex: 2,
          }}
        >
          RooBaRoo — Where Every Moment Becomes a Memory
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Times New Roman', serif",
            color: "#F5E6CC",
            maxWidth: "800px",
            mt: 1,
            mb: 6,
            lineHeight: 1.8,
            letterSpacing: "1px",
            zIndex: 2,
          }}
        >
          Celebrate culture, creativity, and unforgettable experiences
          through the spirit of Roobaroo.
        </Typography>

      </Box>
{/* EVENT SECTION */}
<Box
  sx={{
    mt: 6, // space from hero section
    py: 8,
    px: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(180deg, #B6AD90 0%, #DDB892 100%)",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    borderBottomLeftRadius: "20px",

    boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
  }}
>
  <EventCard
    event={{
      image: bgImage,
      title: "Cultural Fest",
      description:
        "Experience music, dance, creativity and unforgettable moments.",
      date: "2026-03-12",
      category: "Cultural",
    }}
  />
</Box>
    {/* PARTICIPANT FORM SECTION */}
<Box
  sx={{
    mt: 5, // space between EventCard section and Form section

    py: 8,
    px: 3,

    background:
       "linear-gradient(135deg, #582F0E 0%, #7F4F24 50%, #936639 100%)",

    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "20px",
    borderBottomLeftRadius: "20px",

    boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
  }}
>
  <ParticipantForm />
</Box>
      <Footer />
    </>
  );
}