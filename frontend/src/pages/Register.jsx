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

export default function Register() {
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
    console.log(form);
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
            onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Full Name"
            fullWidth
            margin="dense"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Email"
            fullWidth
            margin="dense"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Phone"
            fullWidth
            margin="dense"
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
            fullWidth
            margin="dense"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            sx={inputStyle}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="dense"
            value={form.confirmPassword}
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
