import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCj15NVRdiyAiX7yZiSE08D5qPOZO1tIB8",
    authDomain: "fir-upload-react-824b4.firebaseapp.com",
    projectId: "fir-upload-react-824b4",
    storageBucket: "fir-upload-react-824b4.appspot.com",
    messagingSenderId: "144008163544",
    appId: "1:144008163544:web:969a0bdb87420baf9f67ad",
    measurementId: "G-HJ9FX2JF61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);