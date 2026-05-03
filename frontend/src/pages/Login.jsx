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
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, AlternateEmail, LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const validate = () => {
  let tempErrors = { email: "", password: "" };
  let isValid = true;

  if (!email) {
    tempErrors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    tempErrors.email = "Email is invalid";
    isValid = false;
  }

  if (!password) {
    tempErrors.password = "Password is required";
    isValid = false;
  } else if (password.length < 6) {
    tempErrors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  setErrors(tempErrors);
  return isValid;
};

const handleLogin = async () => {
  if (!validate()) return; // Stop if validation fails
  
  setLoading(true);
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    const { role, token } = res.data;
    
    // Check role against selected tab
    if (tab === 0 && role !== "admin") {
      setErrors({ ...errors, email: "❌ Only Admin can login here" });
      setLoading(false);
      return;
    }
    if (tab === 1 && role === "admin") {
      setErrors({ ...errors, email: "❌ Admin must login from Administrator tab" });
      setLoading(false);
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    if (role === "admin") navigate("/admin");
    else if (role === "head") navigate("/head");
    else navigate("/member");
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
  
  const textFieldStyles = {
  mb: 2.5,
  "& .MuiInputLabel-root": {
    color: "rgba(127, 79, 36, 0.6)",
    fontWeight: 500,
    fontSize: "0.95rem",
    transform: "translate(48px, 20px) scale(1)", // Aligned with icons
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&.Mui-focused": {
      color: "#582F0E !important", // Force brown on focus
    },
  },
  "& .MuiInputLabel-shrink": {
    transform: "translate(48px, 8px) scale(0.75) !important",
    fontWeight: 800,
    color: "#582F0E",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "18px",
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Translucent glass effect
    backdropFilter: "blur(4px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    
    // Fix for the "missing top border" issue
    "& legend": { width: "0px" }, 

    "& fieldset": {
      borderColor: "rgba(127, 79, 36, 0.12)",
      borderWidth: "1.5px",
      top: 0,
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      transform: "translateY(-2px)", // Subtle lift on hover
      "& fieldset": {
        borderColor: "#7F4F24 !important",
      },
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: "0 12px 24px rgba(127, 79, 36, 0.12)", // Premium depth shadow
      "& fieldset": {
        borderColor: "#7F4F24 !important", // Overrides default blue
        borderWidth: "2px !important",
      },
    },
    "& input": {
      padding: "26px 14px 10px 12px",
      color: "#3A2D1E",
      fontWeight: 600,
    },
    // Removes native browser clutter
    "& input::-ms-reveal, & input::-ms-clear": { display: "none" },
  },
};
  return (
    <Box sx={{ display: "flex", height: "100vh", background: "#FDFCFB", overflow: "hidden" }}>
      {/* LEFT SIDE */}
      <Box sx={{ flex: 1.4, position: "relative", display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <Box
          component={motion.div}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          sx={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 1 }}
        />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(58, 45, 30, 0.85), rgba(127, 79, 36, 0.5))", backdropFilter: "blur(8px)", zIndex: 2 }} />
        <Box sx={{ position: "relative", zIndex: 3, p: 8, color: "white", maxWidth: 600 }}>
          <Typography variant="h1" fontWeight="900" sx={{ mb: 2, fontSize: "4.5rem", fontFamily: "Playfair Display, serif" }}>RooBaRoo</Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 300 }}>Where every shared moment is meticulously woven into a digital legacy.</Typography>
          <Divider sx={{ mt: 4, width: 60, height: 4, bgcolor: "#D8C3A5", borderRadius: 2 }} />
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", p: 4, bgcolor: "#F3E9DC" }}>
        <Paper
          elevation={0}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ p: 5, width: "100%", maxWidth: 440, borderRadius: "32px", background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(20px)", boxShadow: "0 25px 50px -12px rgba(94, 64, 35, 0.15)" }}
        >
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" fontWeight="900" color="#3A2D1E">Welcome Back</Typography>
            <Typography variant="body2" color="text.secondary">Enter your credentials to access the ERP</Typography>
          </Box>

          <Tabs
            value={tab}
            onChange={(e, val) => setTab(val)}
            variant="fullWidth"
            sx={{
              mb: 4, bgcolor: "rgba(127, 79, 36, 0.08)", borderRadius: "16px", p: 0.5,
              "& .MuiTabs-indicator": { height: "100%", borderRadius: "12px", bgcolor: "#fff" },
              "& .MuiTab-root": { zIndex: 1, textTransform: "none", fontWeight: 600, color: "rgba(127, 79, 36, 0.6)", "&.Mui-selected": { color: "#582F0E", fontWeight: 800 } }
            }}
          >
            <Tab label="Administrator" />
            <Tab label="Student" />
          </Tabs>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}>
              <TextField
                label={tab === 0 ? "Admin Email Address" : "Student Email Address"}
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" }); // Clear error while typing
                }}
                error={!!errors.email}
                helperText={errors.email}
                sx={textFieldStyles}
                InputProps={{ 
                  startAdornment: <InputAdornment position="start"><AlternateEmail sx={{ color: errors.email ? "#d32f2f" : "#7F4F24", fontSize: 22, ml: 1 }} /></InputAdornment> 
                }}
              />

              <TextField
                label="Security Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" }); // Clear error while typing
                }}
                error={!!errors.password}
                helperText={errors.password}
                sx={textFieldStyles}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: errors.password ? "#d32f2f" : "#7F4F24", fontSize: 22, ml: 1 }} /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </motion.div>
          </AnimatePresence>

          <Button
            fullWidth variant="contained" disableElevation onClick={handleLogin}
            sx={{ py: 2, borderRadius: "16px", bgcolor: "#7F4F24", fontWeight: 800, "&:hover": { bgcolor: "#5E4023" } }}
          >
            Log In as {tab === 0 ? "Admin" : "Student"}
          </Button>

          {tab === 1 && (
            <Box mt={4} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                New to Roobaroo?{" "}
                <Box component="span" onClick={() => navigate("/register")} sx={{ color: "#7F4F24", fontWeight: 800, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>Create Account</Box>
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}