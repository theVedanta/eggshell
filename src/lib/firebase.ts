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
  apiKey: "AIzaSyAQziPQoJ_Pf-Ytm7voHTM8mLbUuTtQrJQ",
  authDomain: "test-db-ee403.firebaseapp.com",
  projectId: "test-db-ee403",
  storageBucket: "test-db-ee403.firebasestorage.app",
  messagingSenderId: "254384561741",
  appId: "1:254384561741:web:13fb86158f6bca25dd8604",
  measurementId: "G-D9VMPJYBS5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
