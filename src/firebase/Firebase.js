import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAKd0NNMkKyQdQrzjxqrRSP1Md0k5YnjQ8",
    authDomain: "lover1-f037d.firebaseapp.com",
    projectId: "lover1-f037d",
    storageBucket: "lover1-f037d.appspot.com",
    messagingSenderId: "173306832244",
    appId: "1:173306832244:web:e2e5a7255fae7b2318b821",
    measurementId: "G-TVF8P9DTTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);