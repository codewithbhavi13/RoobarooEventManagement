import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/head" element={<Head />} />
        <Route path="/member" element={<Member />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="committees" element={<Committees />} />
          <Route path="participants" element={<Participants />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="attendance" element={<Attendance />} />
      </Route>
      </Routes>
    </>
  );
}

export default App;
