import { Typography, Box, Button } from "@mui/material";
import Navbar from "../Component/Navbar";
import bgImage from "../assets/Roobaroo.jpeg";
import Footer from "../Component/Footer";

export default function Homepage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          // Gradient Background
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
<Box
  sx={{
    position: "absolute",

    // Adjust Size
    width: "1500px",
    height: "800px",

    // Image
    backgroundImage: `url(${bgImage})`,

    backgroundSize: "cover",
    // backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    // Transparency / Opacity
    opacity: 0.18,
    // Optional Blur
    // filter: "blur(1px)",
    // Position Behind Text
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    // Optional Rounded Shape
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
            //WebkitTextStroke: "1px white",
            letterSpacing: "1px",
            //textShadow: "2px 2px 10px rgba(0,0,0,0.15)",
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
            fontFamily:"Times New Roman",
            color: "#F5E6CC",
            maxWidth: "800px",
            mt: 1,
            mb: 6,
            lineHeight: 1.8,
            letterSpacing: "1px",
            zIndex: 1,
          }}
        >
          Celebrate culture, creativity, and unforgettable experiences through the spirit of Roobaroo.
        </Typography>

        {/* Button
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            background:
              "linear-gradient(135deg, #936639 0%, #7F4F24 100%)",
            color: "#F5E6CC",
            px: 5,
            py: 1.6,
            borderRadius: "35px",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "1px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            zIndex: 2,
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              background:
                "linear-gradient(135deg, #7F4F24 0%, #582F0E 100%)",
            },
          }}
        >
          Explore Events
        </Button> */}
      </Box>
      <Footer />
    </>
  );
}