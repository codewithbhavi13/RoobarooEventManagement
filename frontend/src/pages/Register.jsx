import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, AccountCircle, Badge, Phone, MailOutline, Work } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MenuItem } from "@mui/material"; // Add this to your imports

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    rollNo: "", name: "", email: "", phone: "", department: "",
    committees: [], password: "", confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const committeesList = ["Creativity", "Social Media", "Technical"];

  const handleCheckbox = (value) => {
    let updated = [...form.committees];
    if (updated.includes(value)) {
      updated = updated.filter((c) => c !== value);
    } else {
      if (updated.length >= 2) {
        alert("Max 2 committees allowed");
        return;
      }
      updated.push(value);
    }
    setForm({ ...form, committees: updated });
  };

  const handleRegister = async () => {
    // 🔍 1. CHECK MISSING FIELDS
    const missingFields = [];

    if (!form.rollNo) missingFields.push("Roll No");
    if (!form.name) missingFields.push("Full Name");
    if (!form.email) missingFields.push("Email");
    if (!form.phone) missingFields.push("Phone");
    if (!form.department) missingFields.push("Department");
    if (form.committees.length === 0) missingFields.push("Committees");
    if (!form.password) missingFields.push("Password");
    if (!form.confirmPassword) missingFields.push("Confirm Password");

    if (missingFields.length > 0) {
      alert("Please fill:\n" + missingFields.join("\n"));
      return;
    }

    // 🔐 2. PASSWORD MATCH
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // 🚀 3. API CALL
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollNo: form.rollNo,
          name: form.name,
          email: form.email,
          phone: form.phone,
          department: form.department,
          committees: form.committees,
          password: form.password,
        }),
      });

      const data = await res.json();

      // ❌ ERROR HANDLING
      if (!res.ok) {
        if (data.fields) {
          alert("Missing:\n" + data.fields.join("\n"));
        } else {
          alert(data.message || "Registration failed");
        }
        return;
      }

      // ✅ SUCCESS
      alert("Registration successful!");

      // 🔄 REDIRECT
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };


  // 🔥 Enhanced "Inside-Proper" Input Styles
  const inputStyle = {
    "& .MuiInputLabel-root": {
      color: "rgba(127, 79, 36, 0.7)",
      fontSize: "0.9rem",
      transform: "translate(14px, 16px) scale(1)",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, 7px) scale(0.75) !important",
      color: "#582F0E",
      fontWeight: 700,
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      borderRadius: "12px",
      transition: "0.3s",
      "& legend": { display: "none" }, // Fixes the disappearing top outline
      "& fieldset": { borderColor: "rgba(127, 79, 36, 0.2)", top: 0 },
      "&:hover fieldset": { borderColor: "#7F4F24" },
      "&.Mui-focused fieldset": { borderColor: "#7F4F24", borderWidth: "2px" },
      "& input": { padding: "24px 14px 10px 14px" },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #F3E9DC 0%, #D8C3A5 100%)",
      }}
    >
      {/* LEFT SIDE: Brand Branding */}
      <Box
        sx={{
          flex: 0.7,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(180deg, #936639 0%, #7F4F24 100%)",
          color: "white",
          p: 6,
          textAlign: "center"
        }}
      >
        <Typography variant="h2" fontWeight={800} fontFamily="serif">Roobaroo</Typography>
        <Typography variant="h6" sx={{ opacity: 0.8, mt: 2, fontWeight: 300 }}>Join the legacy of memories.</Typography>
      </Box>

      {/* RIGHT SIDE: Form */}
      <Box sx={{ flex: 1.3, display: "flex", justifyContent: "center", alignItems: "center", p: 3 }}>
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            width: "100%",
            maxWidth: 700,
            p: 4,
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h4" fontWeight={800} color="#582F0E" textAlign="center" mb={1}>Create Account</Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={4}>Please fill in your details to register</Typography>

          {/* SECTION: BASIC DETAILS */}
          <Typography variant="subtitle2" color="#7F4F24" fontWeight={700} mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountCircle fontSize="small" /> Personal Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Roll No" fullWidth value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value })} sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Full Name" fullWidth value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" fullWidth value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} sx={inputStyle} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Phone" fullWidth value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} sx={inputStyle} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  select
                  label="Department"
                  fullWidth
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  sx={inputStyle}
                  // This helps align the selected text with the nested label logic
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          borderRadius: "12px",
                          marginTop: "8px",
                          boxShadow: "0 10px 25px rgba(127, 79, 36, 0.1)",
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="MCA" sx={{ color: "#582F0E", fontWeight: 500 }}>MCA</MenuItem>
                  <MenuItem value="MMS" sx={{ color: "#582F0E", fontWeight: 500 }}>MMS</MenuItem>
                </TextField>
            </Grid>
          </Grid>

          {/* SECTION: COMMITTEES */}
          <Typography variant="subtitle2" color="#7F4F24" fontWeight={700} mt={3} mb={1}>
            Committees Selection (Max 2)
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
            {committeesList.map((c) => (
              <FormControlLabel
                key={c}
                control={
                  <Checkbox
                    checked={form.committees.includes(c)}
                    onChange={() => handleCheckbox(c)}
                    sx={{ color: '#7F4F24', '&.Mui-checked': { color: '#7F4F24' } }}
                  />
                }
                label={<Typography variant="body2">{c}</Typography>}
              />
            ))}
          </Box>

          {/* SECTION: SECURITY */}
          <Typography variant="subtitle2" color="#7F4F24" fontWeight={700} mt={2} mb={2}>
            Security
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password" type={showPassword ? "text" : "password"} fullWidth
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} sx={inputStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end"><Visibility size={20} /></IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirm Password" type={showPassword ? "text" : "password"} fullWidth
                value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} sx={inputStyle}
                error={form.confirmPassword && form.password !== form.confirmPassword}
              />
            </Grid>
          </Grid>

          {/* BUTTON */}
          <Button
            fullWidth variant="contained" onClick={handleRegister}
            sx={{
              mt: 4, py: 1.5, borderRadius: "14px", fontWeight: 700, fontSize: "1rem", textTransform: "none",
              background: "linear-gradient(90deg, #936639 0%, #7F4F24 100%)",
              boxShadow: "0 10px 20px rgba(127, 79, 36, 0.2)",
              "&:hover": { background: "#582F0E" }
            }}
          >
            Create My Account
          </Button>

          <Typography align="center" variant="body2" mt={3} color="text.secondary">
            Already have an account?{" "}
            <Box component="span" onClick={() => navigate("/login")} sx={{ color: "#7F4F24", fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
              Log In
            </Box>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}