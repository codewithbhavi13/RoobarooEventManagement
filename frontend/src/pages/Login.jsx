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
import { useContext } from "react";
import { UserContext } from "../context/User";

export default function LoginPage() {
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);
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
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(127,79,36,0.8), rgba(147,102,57,0.8))",
          }}
        />

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
          }}
        >
          <Typography variant="h3" fontWeight="bold">
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
        }}
      >
        <Paper sx={{ p: 4, width: 350, borderRadius: 4 }}>
          <Typography
            align="center"
            variant="h5"
            fontWeight="bold"
            color="#7F4F24"
          >
            Login
          </Typography>

          {/* TABS */}
          <Tabs
            value={tab}
            onChange={(e, val) => setTab(val)}
            centered
            sx={{ mb: 2 }}
          >
            <Tab label="Admin" />
            <Tab label="Student" />
          </Tabs>

          {/* FORM */}
          <TextField
            label={tab === 0 ? "Admin Email" : "Student Email"}
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          {/* LOGIN BUTTON */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#936639" }}
            onClick={() => handleLogin({ email, password }, tab)}
          >
            {tab === 0 ? "Admin Login" : "Student Login"}
          </Button>

          {/* ✅ REGISTER ONLY FOR STUDENT */}
          {tab === 1 && (
            <Typography
              mt={2}
              textAlign="center"
              sx={{ cursor: "pointer", color: "#7F4F24" }}
              onClick={() => navigate("/register")}
            >
              Don't have an account? Register
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
