// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   List,
//   ListItem,
//   IconButton,
// } from "@mui/material";

// import { Delete, Add } from "@mui/icons-material";
// import { useState } from "react";

// export default function Rules() {
//   const [ruleInput, setRuleInput] = useState("");
//   const [fee, setFee] = useState("");
//   const [rules, setRules] = useState([]);

//   const handleAddRule = () => {
//     if (!ruleInput) return;
//     setRules([...rules, ruleInput]);
//     setRuleInput("");
//   };

//   const handleDelete = (index) => {
//     const updated = rules.filter((_, i) => i !== index);
//     setRules(updated);
//   };

//   return (
//     <Box>
//       {/* HEADER */}
//       <Typography variant="h4" fontWeight={800} mb={3} color="#3A2D1E">
//         Rules & Entry Fees
//       </Typography>

//       {/* ADD SECTION */}
//       <Paper
//         sx={{
//           p: 3,
//           borderRadius: "20px",
//           mb: 4,
//           background: "#FDFCFB",
//           boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
//         }}
//       >
//         <Typography fontWeight={700} mb={2}>
//           Add Rule
//         </Typography>

//         <Box sx={{ display: "flex", gap: 2 }}>
//           <TextField
//             fullWidth
//             label="Enter Rule"
//             value={ruleInput}
//             onChange={(e) => setRuleInput(e.target.value)}
//           />

//           <Button
//             variant="contained"
//             onClick={handleAddRule}
//             sx={{
//               bgcolor: "#7F4F24",
//               "&:hover": { bgcolor: "#582F0E" },
//               borderRadius: "10px",
//             }}
//           >
//             <Add />
//           </Button>
//         </Box>

//         {/* ENTRY FEE */}
//         <Box mt={3}>
//           <Typography fontWeight={700} mb={1}>
//             Entry Fee
//           </Typography>

//           <TextField
//             fullWidth
//             label="Enter Fee (₹)"
//             value={fee}
//             onChange={(e) => setFee(e.target.value)}
//           />
//         </Box>
//       </Paper>

//       {/* RULES LIST */}
//       <Paper
//         sx={{
//           p: 3,
//           borderRadius: "20px",
//           background: "#fff",
//           boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
//         }}
//       >
//         <Typography fontWeight={700} mb={2}>
//           Rules List
//         </Typography>

//         {rules.length === 0 ? (
//           <Typography color="text.secondary">No rules added yet</Typography>
//         ) : (
//           <List>
//             {rules.map((rule, index) => (
//               <ListItem
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   borderBottom: "1px solid #eee",
//                 }}
//               >
//                 <Typography>{rule}</Typography>

//                 <IconButton onClick={() => handleDelete(index)}>
//                   <Delete />
//                 </IconButton>
//               </ListItem>
//             ))}
//           </List>
//         )}
//       </Paper>
//     </Box>
//   );
// }

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  IconButton,
} from "@mui/material";

import { Delete, Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Rules() {
  const [ruleInput, setRuleInput] = useState("");
  const [fee, setFee] = useState("");
  const [rules, setRules] = useState([]);
  const [eventId, setEventId] = useState("");

  const token = localStorage.getItem("token");

  // ✅ FETCH EVENT DATA
  const fetchMyEvent = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = JSON.parse(atob(token.split(".")[1])).id;

      const myEvent = res.data.find(
        (e) => e.head?._id === userId || e.head === userId,
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

  useEffect(() => {
    fetchMyEvent();
  }, []);

  // ✅ ADD RULE
  const handleAddRule = async () => {
    if (!ruleInput) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/events/add-rule",
        { rule: ruleInput, eventId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setRules(res.data.rules);
      setRuleInput("");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // ✅ UPDATE FEE
  const handleUpdateFee = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/events/update-fee",
        { eventId, fee },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("Fee updated ✅");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} mb={3}>
        Rules & Entry Fees
      </Typography>

      {/* ADD RULE */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: "20px" }}>
        <Typography fontWeight={700} mb={2}>
          Add Rule
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Enter Rule"
            value={ruleInput}
            onChange={(e) => setRuleInput(e.target.value)}
          />

          <Button variant="contained" onClick={handleAddRule}>
            <Add />
          </Button>
        </Box>

        {/* ENTRY FEE */}
        <Box mt={3}>
          <Typography fontWeight={700} mb={1}>
            Entry Fee (₹)
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              value={fee}
              onChange={(e) => setFee(e.target.value)}
            />

            <Button variant="contained" onClick={handleUpdateFee}>
              Save
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* RULE LIST */}
      <Paper sx={{ p: 3, borderRadius: "20px" }}>
        <Typography fontWeight={700} mb={2}>
          Rules List
        </Typography>

        {rules.length === 0 ? (
          <Typography>No rules yet</Typography>
        ) : (
          <List>
            {rules.map((rule, index) => (
              <ListItem key={index}>
                {index + 1}. {rule}
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
