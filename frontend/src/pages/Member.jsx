import { useState } from "react";

export default function Member() {
  const [tab, setTab] = useState("social");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#7F4F24", color: "white" }}>
        <h3>Roobaroo</h3>

        <button onClick={() => setTab("social")}>Social</button>
        <button onClick={() => setTab("technical")}>Technical</button>
        <button onClick={() => setTab("creativity")}>Creativity</button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {tab === "social" && <h2>Social Events</h2>}
        {tab === "technical" && <h2>Technical Events</h2>}
        {tab === "creativity" && <h2>Creativity Events</h2>}
      </div>
    </div>
  );
}
