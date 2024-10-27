import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3yClzwdwtPgw0hDoHw_2G7ZSjckzvph0",
  authDomain: "mental-login.firebaseapp.com",
  projectId: "mental-login",
  storageBucket: "mental-login.appspot.com",
  messagingSenderId: "422074762166",
  appId: "1:422074762166:web:ffab7b4150f2caeddab717",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore();

export { auth, provider, db };
