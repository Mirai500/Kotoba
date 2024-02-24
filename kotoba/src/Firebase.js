import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBzKXEZ1rTT8r0LoXVVRuKRYQjhii-XZNw",
    authDomain: "chat-app-496c4.firebaseapp.com",
    projectId: "chat-app-496c4",
    storageBucket: "chat-app-496c4.appspot.com",
    messagingSenderId: "581986988528",
    appId: "1:581986988528:web:93705bac11c87e3e69ad35",
    measurementId: "G-WRH074EKP0"
  };
 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };