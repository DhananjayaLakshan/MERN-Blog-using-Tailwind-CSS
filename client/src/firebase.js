// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,//in vite thats how we call enviranment variables
    authDomain: "mern-blog-7cc30.firebaseapp.com",
    projectId: "mern-blog-7cc30",
    storageBucket: "mern-blog-7cc30.appspot.com",
    messagingSenderId: "879810815657",
    appId: "1:879810815657:web:8af64650bf37a1297e2bb8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);