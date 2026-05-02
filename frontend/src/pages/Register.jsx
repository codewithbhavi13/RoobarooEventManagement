import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    rollNo: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    committees: [],
    password: "",
    confirmPassword: "",
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
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      borderRadius: "10px",

      "& fieldset": {
        borderColor: "#ccc",
      },

      "&:hover fieldset": {
        borderColor: "#7F4F24",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#936639",
        borderWidth: "2px",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#7F4F24",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#936639",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#ffffff",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          flex: 0.8,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(180deg, #936639 0%, #7F4F24 45%, #582F0E 100%)",
          color: "#F5E6CC",
        }}
      >
        <Typography
          sx={{
            fontSize: "2.5rem",
            fontWeight: 700,
            fontFamily: "'Times New Roman', serif",
          }}
        >
          Roobaroo
        </Typography>
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          flex: 1.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 4,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: 650,
            backgroundColor: "#ffffff",
            color: "#000",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            p: 4,
            borderRadius: "16px",
          }}
        >
          {/* TITLE */}
          <Typography
            align="center"
            sx={{
              fontSize: "1.8rem",
              fontWeight: 700,
              mb: 2,
              fontFamily: "'Times New Roman', serif",
              color: "#7F4F24",
            }}
          >
            Register
          </Typography>

          {/* BASIC DETAILS */}
          <Typography sx={{ mb: 1, color: "#7F4F24", fontWeight: 600 }}>
            Basic Details
          </Typography>

          <TextField
            label="Roll No"
            fullWidth
            margin="dense"
            value={form.rollNo}
            onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Full Name"
            fullWidth
            margin="dense"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Phone"
            fullWidth
            margin="dense"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />

          {/* DEPARTMENT */}
          <TextField
            select
            label="Department"
            fullWidth
            margin="dense"
            SelectProps={{ native: true }}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            sx={inputStyle}
            value={form.department}
            InputLabelProps={{ shrink: true }}
          >
            <option value="">Select</option>
            <option value="MCA">MCA</option>
            <option value="MMS">MMS</option>
          </TextField>

          {/* COMMITTEE */}
          <Typography sx={{ mt: 2, mb: 1, color: "#7F4F24", fontWeight: 600 }}>
            Select Committees (Max 2)
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {committeesList.map((c) => (
              <FormControlLabel
                key={c}
                control={
                  <Checkbox
                    checked={form.committees.includes(c)}
                    onChange={() => handleCheckbox(c)}
                  />
                }
                label={c}
              />
            ))}
          </Box>

          {/* PASSWORD */}
          <Typography sx={{ mt: 2, mb: 1, color: "#7F4F24", fontWeight: 600 }}>
            Security
          </Typography>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            fullWidth
            margin="dense"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={form.confirmPassword}
            fullWidth
            margin="dense"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />

          {/* PASSWORD MATCH */}
          {form.confirmPassword && (
            <Typography
              sx={{
                fontSize: "0.75rem",
                mt: 0.5,
                color:
                  form.password === form.confirmPassword
                    ? "#2e7d32"
                    : "#ff6b6b",
              }}
            >
              {form.password === form.confirmPassword
                ? "✓ Passwords match"
                : "✗ Passwords do not match"}
            </Typography>
          )}

          {/* BUTTON */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              borderRadius: "25px",
              py: 1,
              fontWeight: 600,
              background: "linear-gradient(180deg, #936639 0%, #7F4F24 100%)",
              color: "#F5E6CC",
            }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
