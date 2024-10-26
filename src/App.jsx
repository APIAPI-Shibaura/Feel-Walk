// App.jsx
import { useEffect, useState } from "react";
import { auth } from "./firebase/login";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginButton from "./LoginButton";
import Home from "./Home";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // firebaseの認証情報を監視
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const isHomePage = location.pathname === "/home";

  return (
    <div className={`App ${isHomePage ? "no-background" : ""}`}>
      {!user || !isHomePage ? <h1>Feel Walk</h1> : null}
      <Routes>
        {/* "/" にアクセス ⇒ 認証状況でリダイレクト */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />

        {/* "/login"にアクセス ⇒ userがいるなら"/home"に、いなければLoginButton表示 */}
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <LoginButton />}
        />

        {/* "/home"にアクセス ⇒ userがいるならHomeコンポーネント表示、いなければ"/login"にリダイレクト */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
