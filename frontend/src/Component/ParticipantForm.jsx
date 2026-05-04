import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
  InputAdornment,
  Divider,
  Chip,
  CircularProgress,
  Fade,
  Paper,
  alpha,
  useTheme
} from "@mui/material";
import {
  Person,
  School,
  Phone,
  Email,
  Groups,
  CloudUpload,
  Receipt,
  CheckCircle,
  Stars,
  ShieldOutlined,
  InfoOutlined
} from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

export default function ParticipantForm({ eventId }) {
  const [form, setForm] = useState({
    name: "",
    college: "",
    phone: "",
    email: "",
    teamName: "",
    paymentId: "",
  });

  const [files, setFiles] = useState({
    idProof: null,
    paymentScreenshot: null,
  });

  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => data.append(key, form[key]));
      data.append("eventId", eventId);
      data.append("idProof", files.idProof);
      data.append("paymentScreenshot", files.paymentScreenshot);

      await axios.post("http://localhost:5000/api/participants/register", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Registration Successful!");
    } catch (err) {
      console.error(err);
      alert("❌ Registration Failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // --- ENHANCED LABEL & INPUT STYLING ---
  const inputStyle = {
    mb: 1,
    "& .MuiInputLabel-root": {
      color: "#7F4F24", // Default label color
      fontWeight: 600,
      fontSize: "0.95rem",
      "&.Mui-focused": {
        color: "#582F0E", // Focused label color
      },
    },
    "& .MuiFilledInput-root": {
      backgroundColor: alpha("#F5E6CC", 0.25),
      borderRadius: "12px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      border: "1px solid",
      borderColor: alpha("#7F4F24", 0.1),
      "&:hover": {
        backgroundColor: alpha("#F5E6CC", 0.4),
        borderColor: alpha("#7F4F24", 0.3),
      },
      "&.Mui-focused": {
        backgroundColor: "white",
        borderColor: "#7F4F24",
        boxShadow: `0 4px 14px ${alpha("#7F4F24", 0.15)}`,
      },
      "&:before, &:after": { display: "none" },
    },
    "& .MuiFormHelperText-root": {
      fontWeight: 500,
      color: alpha("#7F4F24", 0.6),
      ml: 1
    }
  };

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      {/* Header Section */}
      <Stack spacing={1} alignItems="center" sx={{ mb: 6 }}>
        <Stars sx={{ color: "#DDB892", fontSize: 40 }} />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: "#3A2D1E",
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "-0.5px"
          }}
        >
          Event Registration
        </Typography>
        <Typography variant="body2" sx={{ color: "#7F4F24", opacity: 0.8, fontWeight: 500 }}>
          Securing your place in the legacy of RooBaRoo
        </Typography>
      </Stack>

      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: "auto" }}>
        <Grid container spacing={3}>
          
          {/* Section 1: Labels integrated into TextFields */}
          <Grid item xs={12}>
             <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#DDB892", mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
               <InfoOutlined fontSize="small" /> SECTION 1: CANDIDATE DETAILS
             </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="name"
              label="Legal Full Name"
              placeholder="As per College ID"
              variant="filled"
              onChange={handleChange}
              required
              sx={inputStyle}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Person sx={{ color: "#7F4F24" }} /></InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="college"
              label="College / Institution"
              placeholder="Your current University"
              variant="filled"
              onChange={handleChange}
              required
              sx={inputStyle}
              InputProps={{
                startAdornment: <InputAdornment position="start"><School sx={{ color: "#7F4F24" }} /></InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="phone"
              label="WhatsApp Number"
              placeholder="+91 XXXXX XXXXX"
              variant="filled"
              onChange={handleChange}
              required
              sx={inputStyle}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Phone sx={{ color: "#7F4F24" }} /></InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="email"
              label="Official Email Address"
              placeholder="name@example.com"
              variant="filled"
              onChange={handleChange}
              required
              sx={inputStyle}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Email sx={{ color: "#7F4F24" }} /></InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="teamName"
              label="Team Identity"
              helperText="Optional: Required only for group-based activities"
              variant="filled"
              placeholder="Enter Team Name or Individual"
              onChange={handleChange}
              sx={inputStyle}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Groups sx={{ color: "#7F4F24" }} /></InputAdornment>,
              }}
            />
          </Grid>

          {/* Section 2: Payment */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Divider>
              <Chip 
                icon={<ShieldOutlined style={{ color: '#7F4F24' }} />} 
                label="SECURE PAYMENT VERIFICATION" 
                sx={{ bgcolor: "#F5E6CC", fontWeight: 800, color: "#582F0E" }} 
              />
            </Divider>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="paymentId"
              label="Transaction UTR / ID"
              helperText="12-digit number from your banking app"
              variant="filled"
              onChange={handleChange}
              required
              sx={inputStyle}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Receipt sx={{ color: "#7F4F24" }} /></InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              component="label"
              fullWidth
              variant="outlined"
              startIcon={files.idProof ? <CheckCircle /> : <CloudUpload />}
              sx={{
                height: "56px",
                borderRadius: "12px",
                borderStyle: "dashed",
                borderWidth: "2px",
                borderColor: files.idProof ? "#2e7d32" : "#DDB892",
                color: files.idProof ? "#2e7d32" : "#7F4F24",
                fontWeight: 700,
                "&:hover": { borderColor: "#7F4F24", bgcolor: alpha("#F5E6CC", 0.15) }
              }}
            >
              {files.idProof ? "ID Document Loaded" : "Upload College ID"}
              <input hidden type="file" name="idProof" onChange={handleFileChange} required />
            </Button>
          </Grid>

          <Grid item xs={12}>
             <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "16px",
                textAlign: "center",
                border: "2px dashed",
                borderColor: files.paymentScreenshot ? "#2e7d32" : "#DDB892",
                bgcolor: files.paymentScreenshot ? alpha("#2e7d32", 0.04) : alpha("#FDFCFB", 0.5),
                transition: "all 0.3s ease"
              }}
             >
                <Stack spacing={1.5} alignItems="center">
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: "50%", 
                    bgcolor: files.paymentScreenshot ? alpha("#2e7d32", 0.1) : alpha("#DDB892", 0.1) 
                  }}>
                    <CloudUpload sx={{ fontSize: 32, color: files.paymentScreenshot ? "#2e7d32" : "#7F4F24" }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#3A2D1E" }}>
                      {files.paymentScreenshot ? "Receipt Attached" : "Payment Confirmation"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {files.paymentScreenshot ? files.paymentScreenshot.name : "Please upload a clear screenshot of the transaction (JPG/PNG)"}
                    </Typography>
                  </Box>
                  <Button
                    component="label"
                    variant="contained"
                    sx={{ 
                      bgcolor: "#7F4F24", 
                      borderRadius: "10px",
                      px: 4,
                      "&:hover": { bgcolor: "#582F0E" } 
                    }}
                  >
                    {files.paymentScreenshot ? "Change File" : "Select Screenshot"}
                    <input hidden type="file" name="paymentScreenshot" onChange={handleFileChange} required />
                  </Button>
                </Stack>
             </Paper>
          </Grid>

          {/* Action Button */}
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 2,
                borderRadius: "14px",
                fontWeight: 900,
                fontSize: "1.1rem",
                bgcolor: "#582F0E",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                "&:hover": {
                  bgcolor: "#3A2D1E",
                  transform: "scale(1.01)",
                  boxShadow: `0 10px 25px ${alpha("#3A2D1E", 0.4)}`,
                },
              }}
            >
              {loading ? <CircularProgress size={26} sx={{ color: "white" }} /> : "FINALIZE REGISTRATION"}
            </Button>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}