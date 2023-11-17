// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBh5z1XwXaf5nkZoMpIILkRpRTsor9c2Wk",
    authDomain: "lover-44243.firebaseapp.com",
    projectId: "lover-44243",
    storageBucket: "lover-44243.appspot.com",
    messagingSenderId: "793117494541",
    appId: "1:793117494541:web:8982ce4d79177d9a75b444",
    measurementId: "G-ZV75L2QE7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);