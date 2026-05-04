import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }, tab) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const role = res.data.role;
      setUser(res.data.user);
      // ❌ BLOCK WRONG LOGIN
      if (tab === 0 && role !== "admin") {
        alert("❌ Only Admin can login here");
        return;
      }

      if (tab === 1 && role === "admin") {
        alert("❌ Admin must login from Admin tab");
        return;
      }

      // ✅ STORE
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);

      alert("Login successful");
      setLogin(true);
      // ✅ REDIRECT
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/member");
      }
    } catch (err) {
      setLogin(false);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [isLogin]);
  return (
    <UserContext.Provider
      value={{ token, isLogin, handleLogin, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
