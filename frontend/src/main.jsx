import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/User.jsx";
import { EventProvider } from "./context/Event.jsx";
import { CommitteeProvider } from "./context/Committee.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <EventProvider>
          <CommitteeProvider>
            <App />
          </CommitteeProvider>
        </EventProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
