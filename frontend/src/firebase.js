// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "ca-firm-c8310.appspot.com",
  messagingSenderId: "736700538457",
  appId: "1:736700538457:web:e0e839e8fbb9a0a9d09b48",
  measurementId: "G-RVQBV6LC0E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth and Google provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
