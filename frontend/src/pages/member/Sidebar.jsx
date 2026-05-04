import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  Dashboard,
  Event,
  Assignment,
  Notifications,
  Rule,
  Group,
  Task,
  Star,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/member", icon: <Dashboard /> },
    { name: "Events", path: "/member/events", icon: <Event /> },
    { name: "My Requests", path: "/member/requests", icon: <Assignment /> },
    { name: "Committees", path: "/member/committees", icon: <Group /> },

    // ⭐ EVENT HEAD MENU
    ...(role == "team_head"
      ? [
          {
            name: "Rules & Fees",
            path: "/member/manage/rules",
            icon: <Rule />,
          },
          {
            name: "Participants",
            path: "/member/manage/participants",
            icon: <Group />,
          },
          {
            name: "Tasks",
            path: "/member/manage/tasks",
            icon: <Task />,
          },
          {
            name: "Requirements",
            path: "/member/manage/requirements",
            icon: <Star />,
          },
        ]
      : []),
  ];

  return (
    <Box
      sx={{
        width: 250,
        minHeight: "100vh",
        background: "#582F0E",
        color: "#F5E6CC",
        p: 2,
        position: "relative",
      }}
    >
      {/* 🔔 NOTIFICATION ICON */}
      <Box
        sx={{
          position: "absolute",
          top: 15,
          right: 15,
          cursor: "pointer",
        }}
        onClick={() => navigate("/member/notification")} // ✅ FIXED
      >
        <Notifications
          sx={{
            fontSize: 28,
            color: "#F5E6CC",
            "&:hover": {
              color: "#DDB892",
              transform: "scale(1.1)",
            },
          }}
        />
      </Box>

      {/* TITLE */}
      <Typography
        sx={{
          fontSize: "1.6rem",
          fontWeight: 700,
          mb: 3,
          textAlign: "center",
        }}
      >
        Member Panel
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
