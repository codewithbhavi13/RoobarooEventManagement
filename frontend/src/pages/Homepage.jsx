import { Typography, Box } from "@mui/material";
import Navbar from "../Component/Navbar"; 
import bgImage from "../assets/Roobaroo.jpeg";
import Footer from "../Component/Footer";
import EventCard from "../Component/EventCard.jsx"; 

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
            height: "800px",

            backgroundImage: `url(${bgImage})`,

            backgroundSize: "cover",

            backgroundPosition: "center",

            backgroundRepeat: "no-repeat",

            opacity: 0.18,

            top: "50%",
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
<Box
  sx={{
    py: 8,
    display: "flex",
    justifyContent: "center",
    background:
      "linear-gradient(180deg, #B6AD90 0%, #DDB892 100%)",
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
      <Footer />
    </>
  );
}