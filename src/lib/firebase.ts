// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: "thevedanta-77b35.firebaseapp.com",
//   projectId: "thevedanta-77b35",
//   storageBucket: "thevedanta-77b35.firebasestorage.app",
//   messagingSenderId: "1044453860581",
//   appId: "1:1044453860581:web:cfe9b8889fca70ff23a00c",
//   measurementId: "G-MYP2CRYFH2",
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9p0EY5GhW-mTN5rDqf8ns9IJCbqqONQk",
  authDomain: "eggshelldb.firebaseapp.com",
  projectId: "eggshelldb",
  storageBucket: "eggshelldb.firebasestorage.app",
  messagingSenderId: "58830390770",
  appId: "1:58830390770:web:f7173b7b20a80e97ba576b",
  measurementId: "G-45STELBL9Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
