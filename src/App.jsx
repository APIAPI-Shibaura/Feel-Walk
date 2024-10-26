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
        <h1>Mental Traker</h1>
        {/*aaa*/}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginButton />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
