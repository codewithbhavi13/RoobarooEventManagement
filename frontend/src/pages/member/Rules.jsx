import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  IconButton,
  InputAdornment,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip
} from "@mui/material";
import {
  DeleteSweep,
  AddCircle,
  Payments,
  Gavel,
  CheckCircle,
  HistoryEdu,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function Rules() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const [ruleInput, setRuleInput] = useState("");
  const [fee, setFee] = useState("");
  const [rules, setRules] = useState([]);
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchMyEvent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      const myEvent = res.data.find(
        (e) => e.head?._id === userId || e.head === userId
      );

      if (myEvent) {
        setEventId(myEvent._id);
        setRules(myEvent.rules || []);
        setFee(myEvent.entryFee || 0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMyEvent(); }, []);

  const handleAddRule = async () => {
    if (!ruleInput.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/events/add-rule",
        { rule: ruleInput, eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRules(res.data.rules);
      setRuleInput("");
    } catch (err) { console.error(err); }
  };

  const handleUpdateFee = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/events/update-fee",
        { eventId, fee },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTimeout(() => setLoading(false), 1000);
    } catch (err) { setLoading(false); }
  };

  // ✅ Layout Styles
  const cardStyle = {
    p: { xs: 3, md: 4 },
    borderRadius: "24px",
    background: "#FFFFFF",
    boxShadow: "0 10px 40px rgba(127, 79, 36, 0.05)",
    border: "1px solid rgba(127, 79, 36, 0.08)",
    display: "flex",
    flexDirection: "column",
    height: { md: "640px", xs: "auto" },
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      transition: "all 0.3s ease",
      "& fieldset": { borderColor: "rgba(127, 79, 36, 0.15)" },
      "&:hover fieldset": { borderColor: "#7F4F24" },
      "&.Mui-focused fieldset": { borderColor: "#7F4F24", borderWidth: "2px" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#7F4F24" },
  };

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      
      {/* HEADER SECTION */}
      <Box mb={6} textAlign={isMobile ? "center" : "left"}>
        <Typography variant={isMobile ? "h4" : "h3"} fontWeight={900} color="#3A2D1E" sx={{ letterSpacing: "-1px", mb: 1 }}>
          Event Rules & Pricing
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ opacity: 0.8, fontWeight: 500 }}>
          Manage your event guidelines and participant entry fees from one central dashboard.
        </Typography>
      </Box>

      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" }, 
        gap: 4,
        alignItems: "stretch"
      }}>
        
        {/* LEFT: MANAGEMENT FORM */}
        <Paper sx={cardStyle}>
          <Box display="flex" alignItems="center" mb={4} gap={1.5}>
            <Box sx={{ p: 1, borderRadius: "12px", bgcolor: "rgba(127, 79, 36, 0.1)", display: "flex" }}>
              <HistoryEdu sx={{ color: "#7F4F24" }} />
            </Box>
            <Typography variant="h5" fontWeight={800} color="#3A2D1E">Edit Event Rules</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* RULE INPUT */}
            <Box>
              <Typography variant="subtitle2" fontWeight={700} mb={1.5} color="#582F0E" sx={{ ml: 1 }}>
                New Regulation
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Enter event rules ..."
                value={ruleInput}
                onChange={(e) => setRuleInput(e.target.value)}
                sx={inputStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ alignSelf: "flex-end", mb: 1 }}>
                      <Tooltip title="Add Rule">
                        <IconButton onClick={handleAddRule} sx={{ color: "#7F4F24", bgcolor: "rgba(127, 79, 36, 0.05)", "&:hover": { bgcolor: "rgba(127, 79, 36, 0.1)" } }}>
                          <AddCircle />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Divider sx={{ borderStyle: "dashed", borderColor: "rgba(127, 79, 36, 0.2)" }} />

            {/* FEE INPUT */}
            <Box>
              <Typography variant="subtitle2" fontWeight={700} mb={1.5} color="#582F0E" sx={{ ml: 1 }}>
                Registration Fee
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                <TextField
                  fullWidth
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  sx={inputStyle}
                  placeholder="0.00"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Payments sx={{ color: "#7F4F24" }} /></InputAdornment>,
                    endAdornment: <InputAdornment position="end">INR</InputAdornment>
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleUpdateFee}
                  disabled={loading}
                  sx={{
                    borderRadius: "16px",
                    px: 4,
                    minWidth: "140px",
                    bgcolor: "#7F4F24",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "0 8px 20px rgba(127, 79, 36, 0.2)",
                    "&:hover": { bgcolor: "#5E4023", boxShadow: "none" },
                  }}
                >
                  {loading ? <CheckCircle sx={{ mr: 1 }} /> : "Update Fee"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* RIGHT: PREVIEW LIST */}
        <Paper sx={{ ...cardStyle, bgcolor: "#FDFCFB", border: "1px solid rgba(127, 79, 36, 0.1)" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box sx={{ p: 1, borderRadius: "12px", bgcolor: "rgba(127, 79, 36, 0.1)", display: "flex" }}>
                <Gavel sx={{ color: "#7F4F24" }} />
              </Box>
              <Typography variant="h6" fontWeight={800} color="#3A2D1E">Policy Preview</Typography>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", bgcolor: "rgba(0,0,0,0.05)", px: 1.5, py: 0.5, borderRadius: "20px" }}>
              {rules.length} Rules
            </Typography>
          </Box>

          {/* SCROLLABLE LIST AREA */}
          <Box sx={{ 
            flex: 1, 
            overflowY: "auto", 
            pr: 1,
            "&::-webkit-scrollbar": { width: "5px" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(127, 79, 36, 0.2)", borderRadius: "10px" },
          }}>
            <AnimatePresence mode="popLayout">
              {rules.length === 0 ? (
                <Box sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 0.4 }}>
                  <Gavel sx={{ fontSize: 60, mb: 1 }} />
                  <Typography variant="body2" fontWeight={600}>No rules established yet</Typography>
                </Box>
              ) : (
                <List sx={{ p: 0 }}>
                  {rules.map((rule, index) => (
                    <ListItem
                      key={index}
                      component={motion.div}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      sx={{
                        mb: 2,
                        bgcolor: "#FFFFFF",
                        borderRadius: "16px",
                        border: "1px solid rgba(127, 79, 36, 0.05)",
                        p: 2,
                        display: "flex",
                        alignItems: "flex-start",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ color: "#7F4F24", fontWeight: 900, mr: 2, mt: 0.3 }}>
                        {String(index + 1).padStart(2, '0')}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#4A4A4A", flex: 1, lineHeight: 1.6 }}>
                        {rule}
                      </Typography>
                      {/* Optional: Add Delete logic here if supported by your API */}
                    </ListItem>
                  ))}
                </List>
              )}
            </AnimatePresence>
          </Box>

          {/* FINANCIAL SUMMARY FOOTER */}
          <Box 
              sx={{ 
                  mt: 2,
                  p: 2.5, 
                  bgcolor: "#7F4F24", 
                  borderRadius: "20px", 
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "white",
                  boxShadow: "0 10px 20px rgba(127, 79, 36, 0.2)"
              }}
          >
            <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 600 }}>Final Entry Fee</Typography>
            <Typography variant="h5" fontWeight={900}>₹{fee || "0"}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}