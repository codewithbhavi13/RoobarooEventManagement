import { useState } from "react";
import { 
  Box, 
  Typography, 
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  Divider,
  Tooltip
} from "@mui/material";
import { 
  Logout, 
  Person, 
  Settings, 
  NotificationsNone,
  Copyright
} from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminLayout() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : { name: "Admin" };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      
      {/* MAIN WRAPPER */}
      <Box sx={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        height: "100vh",
        position: "relative" 
      }}>
        
        {/* FIXED HEADER */}
        <Box
          sx={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: 4,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(127, 79, 36, 0.1)",
            zIndex: 1100, // Higher than footer/content
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton size="small" sx={{ color: "#7F4F24" }}>
              <NotificationsNone />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 2 }} />
            <Typography variant="body2" fontWeight={700} color="#3A2D1E" sx={{ display: { xs: "none", sm: "block" } }}>
              {user.name}
            </Typography>
            <Tooltip title="Account settings">
              <IconButton onClick={handleClick} size="small" sx={{ p: 0.5 }}>
                <Avatar sx={{ width: 35, height: 35, bgcolor: "#7F4F24", border: "2px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* SCROLLABLE CONTENT AREA */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: "auto", // This makes only the middle part scroll
            p: { xs: 2, md: 4 },
            background: "#fdfcfb",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* This wrapper ensures the content takes up at least the full remaining height */}
          <Box sx={{ flex: 1 }}>
            <Outlet />
          </Box>
        </Box>

        {/* FIXED FOOTER */}
        <Box
          component="footer"
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(127, 79, 36, 0.1)",
            zIndex: 1100,
          }}
        >
          <Copyright sx={{ fontSize: 14, color: "rgba(127, 79, 36, 0.6)", mr: 0.5 }} />
          <Typography variant="caption" fontWeight={600} color="rgba(127, 79, 36, 0.7)">
            2024 Event Management Portal | All Rights Reserved
          </Typography>
        </Box>

        {/* PROFILE MENU (Remains the same) */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              borderRadius: "16px",
              minWidth: "180px",
              filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.1))',
              border: "1px solid rgba(127, 79, 36, 0.05)",
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >

          <MenuItem onClick={handleLogout} sx={{ py: 1.5, mx: 1, borderRadius: "8px", color: "#d32f2f" }}>
            <ListItemIcon><Logout fontSize="small" sx={{ color: "#d32f2f" }} /></ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

      </Box>
    </Box>
  );
}