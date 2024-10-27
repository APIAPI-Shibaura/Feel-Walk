import "./Main_Screen.css";
import Image from "./Image";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase/login";
import Clear from "./components/Clear";
import Sunny from "./components/Sunny";
import Cloudy from "./components/Cloudy";
import Rainy from "./components/Rainy";
import Thunder from "./components/Thunder";
import LrButton from "./LrButton";

function Main_Screen() {
  const [userImage, setUserImage] = useState(null);
  const location = useLocation();
  const { emotion } = location.state || {};

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserImage(user.photoURL);
      } else {
        setUserImage(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Successfully signed out");
      })
      .catch((error) => {
        console.error("ログアウト時のエラー: ", error);
      });
  };

  return (
    <div className="App">
      <Image imageUrl={userImage} onClick={handleLogout} />

      {/* 表示するコンポーネントを感情に応じて切り替え */}
      <div className="weather-content">
        {emotion === "Clear" && <Clear />}
        {emotion === "Sunny" && <Sunny />}
        {emotion === "Cloudy" && <Cloudy />}
        {emotion === "Rainy" && <Rainy />}
        {emotion === "Thunder" && <Thunder />}
      </div>
      <LrButton userImage={userImage} onLogout={handleLogout} />
    </div>
  );
}

export default Main_Screen;
