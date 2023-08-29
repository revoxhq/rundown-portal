// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAz7gf5a66jWc8iWeryiGHCBoy2DhDwnnY",
  authDomain: "rundownstudiosportal.firebaseapp.com",
  projectId: "rundownstudiosportal",
  storageBucket: "rundownstudiosportal.appspot.com",
  messagingSenderId: "253506655744",
  appId: "1:253506655744:web:c9c1075c06e3ca57312ae5",
  measurementId: "G-728VGZJQTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);