import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase/login";

function LoginButton() {
  const signInWithGoogle = () => {
    //firebaseを使う
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User sign in :", result.user);
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
