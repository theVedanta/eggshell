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
  apiKey: "AIzaSyCcQHan0hMP9bfWJWi4y8eAjJhkDoomO9w",
  authDomain: "eggshldb.firebaseapp.com",
  projectId: "eggshldb",
  storageBucket: "eggshldb.firebasestorage.app",
  messagingSenderId: "1029682782959",
  appId: "1:1029682782959:web:b448d0ea9a25c6433bb11a",
  measurementId: "G-JBJ08TM725",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
