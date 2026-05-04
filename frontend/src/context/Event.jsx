import { useEffect } from "react";
import { createContext } from "react";
import { UserContext } from "./User";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const { token, isLogin } = useContext(UserContext);
  const fetchAnnouncements = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/events/announcement",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    setAnnouncements(res.data.announcements);
  };
  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/api/events", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvents(res.data);
  };

  const handleCreateAnnouncement = async (data) => {
    if (!data.title || !data.message) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/events/announcement/create",
        {
          title: data.title,
          message: data.message,
          event: data.event || null, // ✅ important
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("Announcement created ✅");

      fetchAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (isLogin) {
      fetchEvents();
      fetchAnnouncements();
    }
  }, [isLogin]);
  return (
    <EventContext.Provider
      value={{ announcements, events, handleCreateAnnouncement }}
    >
      {children}
    </EventContext.Provider>
  );
};
