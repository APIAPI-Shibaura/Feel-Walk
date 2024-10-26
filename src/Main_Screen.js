// App.js
import "./Main_Screen.css";
import Image from "./Image";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import BackPage from './BackPage';
import { useEffect, useState } from 'react';
import { auth } from './firebase';

function Main_Screen() {
  // Firebase のユーザー情報を保持
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    // Firebase のユーザー情報を監視
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserImage(user.photoURL); // Firebase のユーザー画像 URL を取得
      } else {
        setUserImage(null); // ログアウト時に画像をリセット
      }
    });
    return () => unsubscribe();
  }, []);

  
 // ログアウト処理
 const handleLogout = () => {
  auth.signOut()
    .then(() => {
      console.log("Successfully signed out");
    })
    .catch((error) => {
      console.error("ログアウト時のエラー: ", error);
    });
};

  return (
    <Router>
      <Routes>
      <Route path="/*" element={<Main userImage={userImage} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}




function Main({ userImage, onLogout }) {
  const location = useLocation();
  const isMainScreen = location.pathname === "/";

  return (
    <div className="App">
      <Image imageUrl={userImage} onClick={onLogout} />

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <Link to={isMainScreen ? "/left" : "/"}>
          <button className="Left-button">Left</button>
        </Link>
        <Link to={isMainScreen ? "/right" : "/"}>
          <button className="right-button">Right</button>
        </Link>
      </div>

      <Routes>
        {isMainScreen ? (
          <Route
            path="/"
            element={
              //ここに表画面に乗せたいコードを入れる
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

export default Main_Screen;
