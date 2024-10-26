import { useEffect, useState } from "react";
import { auth } from "./firebase/login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginButton from "./LoginButton";
import Home from "./Home";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //firebaseの認証情報を監視
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  return (
    <Router>
      <div className="App">
        <h1>Feel Walk</h1>
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
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
