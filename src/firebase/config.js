// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "hustlexptest.firebaseapp.com",
    projectId: "hustlexptest",
    storageBucket: "hustlexptest.firebasestorage.app",
    messagingSenderId: "723660899736",
    appId: "1:723660899736:web:3b125338b579897c4917ed",
    measurementId: "G-MM6KYGDL5N"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);