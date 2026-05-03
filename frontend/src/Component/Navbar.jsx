import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import logo from "../assets/logo.jpeg";
import logo1 from "../assets/deslogo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // ✅ Add path mapping
  const menu = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        py: 1.2,
        background:
          "linear-gradient(180deg, #936639 0%, #7F4F24 45%, #582F0E 100%)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar>
        {/* Logo + Title */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Box
            component="img"
            src={logo}
            alt="Roobaroo Logo"
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              mr: 2,
              boxShadow: "0 0 15px rgba(255,255,255,0.25)",
              border: "2px solid rgba(255,255,255,0.2)",
              transition: "0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />

          <Typography
            sx={{
              fontSize: "2.2rem",
              color: "#F5E6CC",
              fontFamily: "'Times New Roman', serif",
              fontWeight: 700,
              letterSpacing: "2px",
              textShadow: "2px 2px 10px rgba(0,0,0,0.4)",
            }}
          >
            RooBaRoo
          </Typography>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {menu.map((item) => (
            <Button
              key={item.name}
              onClick={() => navigate(item.path)} // ✅ NAVIGATION
              sx={{
                color: "#F5E6CC",
                fontWeight: 600,
                fontSize: "1rem",
                letterSpacing: "1px",
                px: 2.5,
                py: 1,
                borderRadius: "25px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.12)",
                  color: "#DDB892",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {item.name}
            </Button>
          ))}

          {/* Login Button */}
          <Button
            variant="contained"
            onClick={() => navigate("/login")} // ✅ LOGIN LINK
            sx={{
              ml: 2,
              background: "linear-gradient(135deg, #DDB892 0%, #B08968 100%)",
              color: "#582F0E",
              px: 3,
              py: 1.2,
              borderRadius: "35px",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "1px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                background: "linear-gradient(135deg, #E6CCB2 0%, #DDB892 100%)",
              },
            }}
          >
            Login
          </Button>

          {/* Right Logo */}
          <Box
            component="img"
            src={logo1}
            alt="DES Logo"
            sx={{
              width: 100,
              height: 80,
              ml: 2,
              objectFit: "contain",
              borderRadius: "10px",
              p: 0.5,
              transition: "0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
