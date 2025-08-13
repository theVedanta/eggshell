import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "thevedanta-77b35.firebaseapp.com",
  projectId: "thevedanta-77b35",
  storageBucket: "thevedanta-77b35.firebasestorage.app",
  messagingSenderId: "1044453860581",
  appId: "1:1044453860581:web:cfe9b8889fca70ff23a00c",
  measurementId: "G-MYP2CRYFH2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
