import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/login";
import Home from "./Home";
import LoginButton from "../LoginButton";
import { Routes, Route } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        navigate("/"); // ログイン済みならホームへ
      } else {
        navigate("/login"); // 未ログインならログインページへ
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div id="login">
      <h1>Feel Walk</h1>
      <Routes>
        <Route path="/" element={user ? <Home /> : <LoginButton />} />
        <Route path="/login" element={user ? <Home /> : <LoginButton />} />
      </Routes>
    </div>
  );
};

export default Login;
