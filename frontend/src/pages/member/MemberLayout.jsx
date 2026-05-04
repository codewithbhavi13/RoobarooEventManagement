import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../context/User";

export default function MemberLayout() {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  console.log(user);
  return (
    <Box sx={{ display: "flex" }}>
      {/* ✅ PASS isHead HERE */}
      <Sidebar role={user?.role} />

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
