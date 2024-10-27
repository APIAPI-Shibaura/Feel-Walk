// Main.js
import React from "react";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import BackPage from "./BackPage";
import Image from "./Image";

function lrButton({ userImage, onLogout }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const isMainScreen = location.pathname === "/";

  return (
    <div className="App">
      <Image imageUrl={userImage} onClick={onLogout} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Link to="/calendar">
          <button className="Left-button">Left</button>
        </Link>
        <Link to="/calendar">
          <button className="right-button">Right</button>
        </Link>
      </div>

      <Routes>
        {isMainScreen ? (
          <Route
            path="/"
            element={
              <div>
                <h1>Main Screen</h1>
                <p>This is the main content displayed on the main screen.</p>
              </div>
            }
          />
        ) : (
          <>
            <Route path="/left" element={<BackPage />} />
            <Route path="/right" element={<BackPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default lrButton;
