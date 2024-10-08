
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6SxcTYU7x4TRPSWWbfAY3Xg-4sVEKSJw",
  authDomain: "twitter-reloaded-72b0e.firebaseapp.com",
  projectId: "twitter-reloaded-72b0e",
  storageBucket: "twitter-reloaded-72b0e.appspot.com",
  messagingSenderId: "311147154210",
  appId: "1:311147154210:web:32063fd2a5594d8ce3f37b"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
