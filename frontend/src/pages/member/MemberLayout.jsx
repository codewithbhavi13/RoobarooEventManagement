// import { Box } from "@mui/material";
// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";

// export default function MemberLayout() {
//   const [isHead, setIsHead] = useState(false);

//   const checkHead = async () => {
//     const res = await axios.get("/api/events", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const userId = jwtDecode(token).id;

//     const hasEvent = res.data.some(
//       (e) => e.head?._id === userId || e.head === userId,
//     );

//     setIsHead(hasEvent);
//   };
//   useEffect(() => {
//     checkHead();
//   }, []);
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       {/* MAIN CONTENT */}
//       <Box
//         sx={{
//           flex: 1,
//           p: 3,
//           background: "#f5f5f5",
//           minHeight: "100vh",
//         }}
//       >
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }

import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function MemberLayout() {
  const [isHead, setIsHead] = useState(false);

  const token = localStorage.getItem("token");

  const checkHead = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = jwtDecode(token).id;

      const hasEvent = res.data.some(
        (e) => e.head?._id === userId || e.head === userId,
      );

      setIsHead(hasEvent);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkHead();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      {/* ✅ PASS isHead HERE */}
      <Sidebar isHead={isHead} />

      <Box
        sx={{
          flex: 1,
          p: 3,
          background: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
