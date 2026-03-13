import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// PASTE YOUR FIREBASE CONFIG HERE
  const firebaseConfig = {
    apiKey: "AIzaSyDIu4wB0SRK8sbyFo8txHnfj3_0x-qOZUQ",
    authDomain: "ecommerce-react-1c724.firebaseapp.com",
    projectId: "ecommerce-react-1c724",
    storageBucket: "ecommerce-react-1c724.firebasestorage.app",
    messagingSenderId: "594573354330",
    appId: "1:594573354330:web:a6beb26d22debc6c1abf63",
    measurementId: "G-PEY4RNZ23F"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };