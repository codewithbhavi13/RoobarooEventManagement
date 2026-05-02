import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // store token + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login successful");

      // 🔥 role-based redirect
      if (res.data.role === "admin") {
        navigate("/admin");
      } else if (res.data.role === "head") {
        navigate("/head");
      } else {
        navigate("/member");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "block" },
        }}
      >
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(127,79,36,0.8), rgba(147,102,57,0.8))",
          }}
        />

        {/* Animated Text */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            px: 4,
          }}
        >
          <Typography variant="h3" fontWeight="bold" fontFamily="serif">
            Roobaroo
          </Typography>
          <Typography variant="h6" mt={2}>
            Where Every Moment Becomes a Memory
          </Typography>
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#B6AD90",
          px: 2,
        }}
      >
        <Paper
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            p: 4,
            width: { xs: "100%", sm: 350 },
            borderRadius: 4,
          }}
        >
          {/* Title */}
          <Typography
            align="center"
            variant="h5"
            fontWeight="bold"
            color="#7F4F24"
          >
            Login
          </Typography>

          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={(e, val) => setTab(val)}
            centered
            sx={{
              mb: 2,
              "& .Mui-selected": {
                color: "#7F4F24",
                fontWeight: "bold",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#7F4F24",
              },
            }}
          >
            <Tab label="Admin" />
            <Tab label="Student" />
          </Tabs>

          {/* FORM */}
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TextField
              label={tab === 0 ? "Admin Email" : "Student Email"}
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ bgcolor: "#fff", borderRadius: 2 }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ bgcolor: "#fff", borderRadius: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: 3,
                backgroundColor: "#936639",
                "&:hover": {
                  backgroundColor: "#7F4F24",
                  transform: "scale(1.05)",
                },
                transition: "0.3s",
              }}
              onClick={handleLogin}
            >
              {tab === 0 ? "Admin Login" : "Student Login"}
            </Button>
          </motion.div>
        </Paper>
      </Box>
    </Box>
  );
}
