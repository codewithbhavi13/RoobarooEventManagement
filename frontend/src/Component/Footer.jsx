import { Box, Typography, IconButton, Stack, Divider } from "@mui/material";
import { Instagram, LinkedIn, Email } from "@mui/icons-material";

export default function Footer() {
  const socials = [{ Icon: Instagram }, { Icon: LinkedIn }, { Icon: Email }];
  return (
    <Box
      sx={{
        mt: 8,
        background:
          "linear-gradient(180deg, #936639 0%, #7F4F24 45%, #582F0E 100%)",
        color: "#F5E6CC",
        pt: 5,
        pb: 3,
        px: { xs: 3, md: 10 },
        boxShadow: "0 -4px 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* TOP SECTION */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        {/* LEFT */}
        <Box>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 700,
              fontFamily: "'Times New Roman', serif",
              letterSpacing: "2px",
              mb: 1,
            }}
          >
            Roobaroo
          </Typography>

          <Typography
            sx={{
              maxWidth: "500px",
              color: "#E6CCB2",
              lineHeight: 1.8,
            }}
          >
            NMITD successfully organized the 14th edition of RoobaRoo on Friday,
            6th March 2026, with the inspiring theme “Unnoticed India – Purpose
            Over Popularity.” The event aimed to celebrate hidden talents,
            grassroots creativity, and the collaborative spirit of students.
            RoobaRoo 2026 provided a vibrant platform for students to
            demonstrate their abilities in leadership, innovation, event
            planning and management, coordination, communication, and
            problem-solving.
          </Typography>
        </Box>

        {/* CENTER */}
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              mb: 2,
              fontSize: "1.1rem",
            }}
          >
            Quick Links
          </Typography>

          <Stack spacing={1}>
            {["🏠 Home", "🎉 Events", "👥 Committees", "📞 Contact"].map(
              (item) => (
                <Typography
                  key={item}
                  sx={{
                    cursor: "pointer",
                    color: "#E6CCB2",
                    transition: "0.3s",
                    "&:hover": {
                      color: "#DDB892",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  {item}
                </Typography>
              ),
            )}
          </Stack>
        </Box>

        {/* RIGHT */}
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: "1.1rem",
            }}
          >
            Contact Us
          </Typography>

          <Typography sx={{ color: "#E6CCB2", mb: 1 }}>
            📍 Navinchandra Mehta Institute of Technology and Development
          </Typography>

          <Typography sx={{ color: "#E6CCB2", mb: 1 }}>
            📧 ncmat@nmitd.edu.in
          </Typography>

          <Typography sx={{ color: "#E6CCB2" }}>📞 +91 9876543210</Typography>

          {/* SOCIAL ICONS */}
          <Box sx={{ mt: 2 }}>
            {socials.map(({ Icon }, index) => (
              <IconButton
                key={index}
                sx={{
                  color: "#F5E6CC",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#DDB892",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Icon />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>

      {/* DIVIDER */}
      <Divider
        sx={{
          my: 3,
          borderColor: "rgba(255,255,255,0.15)",
        }}
      />

      {/* BOTTOM */}
      <Typography
        align="center"
        sx={{
          color: "#E6CCB2",
          fontSize: "0.95rem",
          letterSpacing: "1px",
        }}
      >
        © 2026 Roobaroo • All Rights Reserved
      </Typography>
    </Box>
  );
}
