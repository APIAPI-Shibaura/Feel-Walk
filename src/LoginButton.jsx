import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase/login";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    //firebaseを使う
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User sign in :", result.user);
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error signing in :", error);
      });
  };
  return (
    <button onClick={signInWithGoogle} className="login-button">
      <p className="login-text">ログイン</p>
    </button>
  );
}

export default LoginButton;
