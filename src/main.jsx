import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Main_Screen from "./Main_Screen";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Main_Screen />
    </Router>
  </StrictMode>
);
