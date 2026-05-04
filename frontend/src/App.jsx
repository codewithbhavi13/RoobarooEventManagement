import { Routes, Route, useNavigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Admin from "./pages/Admin";
import Head from "./pages/Head";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import Events from "./pages/admin/Events";
import Committees from "./pages/admin/Committees";
import Participants from "./pages/admin/Participants";
import Tasks from "./pages/admin/Task";
import Attendance from "./pages/admin/Attendance";
import MemberLayout from "./pages/member/MemberLayout";
import MemberEvent from "./pages/member/MemberEvent";
import MyRequests from "./pages/member/MyRequests";
import MemberDashboard from "./pages/member/Dashboard";
import { Home } from "@mui/icons-material";
import Announcement from "./pages/admin/Announcement";
import MemberAnnouncement from "./pages/member/MemberAnnouncement";
import Ruleshead from "./pages/member/Rules";
import Participantshead from "./pages/member/Participants";
import Taskshead from "./pages/member/Tasks";
import Requirementshead from "./pages/member/Requirements";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/User";
function App() {
  const navigate = useNavigate();
  const { isLogin } = useContext(UserContext);
  useEffect(() => {
    if (!isLogin) navigate("/login");
    console.log(isLogin);
  }, [isLogin, navigate]);
  return (
    <>
      <button onClick={() => alert("clicked")}> button </button>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/head" element={<Head />} />
        <Route path="/member" element={<Member />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="committees" element={<Committees />} />
          <Route path="participants" element={<Participants />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="announcement" element={<Announcement />} />
        </Route>
        <Route path="/member" element={<MemberLayout />}>
          <Route index element={<MemberDashboard />} />
          <Route path="events" element={<MemberEvent />} />
          <Route path="requests" element={<MyRequests />} />
          <Route path="notification" element={<MemberAnnouncement />} />
          <Route path="committees" element={<Committees />} />
          {/* ⭐ EVENT HEAD ROUTES */}
          <Route path="manage/rules" element={<Ruleshead />} />
          <Route path="manage/participants" element={<Participantshead />} />
          <Route path="manage/tasks" element={<Taskshead />} />
          <Route path="manage/requirements" element={<Requirementshead />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
