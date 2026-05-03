import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

// ✅ FIX: Use named imports from the root icons package
import {
  Dashboard,
  Event,
  Group,
  People,
  Assignment,
  FactCheck
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ You can safely store the JSX elements directly in the array again
  const menu = [
    { name: "Dashboard", path: "/admin", icon: <Dashboard /> },
    { name: "Events", path: "/admin/events", icon: <Event /> },
    { name: "Committees", path: "/admin/committees", icon: <Group /> },
    { name: "Participants", path: "/admin/participants", icon: <People /> },
    { name: "Tasks", path: "/admin/tasks", icon: <Assignment /> },
    { name: "Attendance", path: "/admin/attendance", icon: <FactCheck /> },
  ];

  return (
    <Box
      sx={{
        width: 250,
        minHeight: "100vh",
        background: "#582F0E",
        color: "#F5E6CC",
        p: 2,
      }}
    >
      {/* TITLE / LOGO */}
      <Typography
        sx={{
          fontSize: "1.6rem",
          fontWeight: 700,
          mb: 3,
          textAlign: "center",
        }}
      >
        Admin Panel
      </Typography>

      {/* MENU */}
      <List>
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.name}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: "10px",
                mb: 1,
                px: 2,
                transition: "0.3s",

                // ACTIVE STYLE
                background: active ? "#936639" : "transparent",
                borderLeft: active
                  ? "4px solid #F5E6CC"
                  : "4px solid transparent",

                "&:hover": {
                  background: "#7F4F24",
                  transform: "translateX(5px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#F5E6CC",
                  minWidth: "35px",
                }}
              >
                {/* ✅ Render the stored icon element here */}
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: active ? 600 : 400,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}