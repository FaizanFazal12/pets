// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pets-1eb7f.firebaseapp.com",
  projectId: "pets-1eb7f",
  storageBucket: "pets-1eb7f.appspot.com",
  messagingSenderId: "901967798463",
  appId: "1:901967798463:web:b40c48f1031cbac916260a",
  measurementId: "G-6CD6X11K55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);
