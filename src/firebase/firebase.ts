import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnIWloMW9aQnYZYjZTFhT8IzlmpMHNW88",
  authDomain: "todolist-4cfaf.firebaseapp.com",
  projectId: "todolist-4cfaf",
  storageBucket: "todolist-4cfaf.firebasestorage.app",
  messagingSenderId: "110567281526",
  appId: "1:110567281526:web:9a8ad95bd20ee8e1b9a057",
  measurementId: "G-LFF1ZZWDNF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
