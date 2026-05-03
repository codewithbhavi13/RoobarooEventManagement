import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MemberLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      {/* MAIN CONTENT */}
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
