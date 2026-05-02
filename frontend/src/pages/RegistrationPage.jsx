import {Box,TextField,Button,Typography,Paper,FormControlLabel,Checkbox} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import LockIcon from "@mui/icons-material/Lock";

// import { useNavigate } from "react-router-dom";

export default function Register() {
//   const navigate = useNavigate();

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

  const committeesList = [
    "Creativity",
    "Social Media",
    "Technical"
  ];

  const handleCheckbox = (value) => {
    let updated = [...form.committees];

    if (updated.includes(value)) {
      updated = updated.filter(c => c !== value);
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
    // const res = await fetch("http://localhost:5000/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(form)
    // });

    // const data = await res.json();

    // // ✅ AUTO LOGIN
    // localStorage.setItem("user", JSON.stringify(data.user));

    // // ✅ REDIRECT TO DASHBOARD
    // navigate("/dashboard");
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
  "& .MuiInputAdornment-root": {
    color: "#582F0E",
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
      border: "none",
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
          color: "#7F4F24"
        }}
      >
        Register
      </Typography>

      {/* BASIC INFO */}
     <Typography sx={{ mb: 1, color: "#7F4F24", fontWeight: 600 }}>
        Basic Details
      </Typography>

      <TextField
        label="Roll No"
        fullWidth
        margin="dense"
        onChange={(e) =>
          setForm({ ...form, rollNo: e.target.value })
        }
        sx={inputStyle}
        InputLabelProps={{ shrink: true }}
        InputProps={{
        startAdornment: (
            <InputAdornment position="start" sx={{ mr: 1 }}>
                <BadgeIcon sx={{ color: "#582F0E", fontSize: 22 }} />
            </InputAdornment>
            ),
        }}
      />

      <TextField
        label="Full Name"
        fullWidth
        margin="dense"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        sx={inputStyle}
        InputLabelProps={{ shrink: true }}
        InputProps={{
            startAdornment: (
            <InputAdornment position="start" sx={{ mr: 1 }}>
                <PersonIcon sx={{ color: "#582F0E", fontSize: 22 }} />
            </InputAdornment>
            ),
        }}  
      />

      <TextField
        label="Email"
        fullWidth
        margin="dense"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        sx={inputStyle}
        InputLabelProps={{ shrink: true }}
        InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <EmailIcon sx={{ color: "#7F4F24" }} />
            </InputAdornment>
        ),
        }}
      />

      <TextField
        label="Phone"
        fullWidth
        margin="dense"
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
        sx={inputStyle}
        InputLabelProps={{ shrink: true }}
         InputProps={{
    startAdornment: (
      <InputAdornment position="start" sx={{ mr: 1 }}>
        <PhoneIcon sx={{ color: "#582F0E", fontSize: 22 }} />
      </InputAdornment>
    ),
  }}
      />

      {/* DEPARTMENT */}
      <TextField
        select
        label="Department"
        fullWidth
        margin="dense"
        SelectProps={{ native: true }}
        onChange={(e) =>
          setForm({ ...form, department: e.target.value })
        }
        sx={inputStyle}
        InputLabelProps={{ shrink: true }}
      >
        <option value="">Select</option>
        <option value="MCA">MCA</option>
        <option value="MMS">MMS</option>
        
      </TextField>

      {/* COMMITTEE SECTION */}
      <Typography sx={{ mb: 1, color: "#7F4F24", fontWeight: 600 }}>
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
                sx={{
                  color: "#7F4F24",
                  "&.Mui-checked": {
                  color: "#936639",
                  }
                }}
              />
            }
            label={c}
          />
        ))}
      </Box>

      {/* PASSWORD SECTION */}
      <Typography sx={{ mb: 1, color: "#7F4F24", fontWeight: 600 }}>
        Security
      </Typography>

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="dense"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 1 }}>
                <LockIcon sx={{ color: "#582F0E", fontSize: 22 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
        }}    
        InputLabelProps={{ shrink: true }}
        sx={inputStyle}
      />

      <TextField
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="dense"
        value={form.confirmPassword}
        onChange={(e) =>
          setForm({
            ...form,
            confirmPassword: e.target.value,
          })
        }
        sx={inputStyle}
        InputLabelProps={{ shrink: true }}
        InputProps={{
        startAdornment: (
        <InputAdornment position="start" sx={{ mr: 1 }}>
            <LockIcon sx={{ color: "#582F0E", fontSize: 22 }} />
        </InputAdornment>
        ),
        endAdornment: (
        <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
        ),
      }}    
      />

      {/* PASSWORD MATCH UI */}
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
          background:
            "linear-gradient(180deg, #936639 0%, #7F4F24 100%)",
          color: "#F5E6CC",
          transition: "0.3s",

          "&:hover": {
            transform: "translateY(-2px)",
            background:
              "linear-gradient(180deg, #A47148 0%, #7F4F24 100%)",
          },
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