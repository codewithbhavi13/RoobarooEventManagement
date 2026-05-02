import { Routes, Route } from "react-router-dom";

import Head from "./pages/Head";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/head" element={<Head />} />
        <Route path="/member" element={<Member />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
