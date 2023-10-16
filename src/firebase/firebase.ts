// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOgIn8AHWjBSp-8jxIi7s8mvN1dIJTq2k",
  authDomain: "photographyportfolio-5c007.firebaseapp.com",
  projectId: "photographyportfolio-5c007",
  storageBucket: "photographyportfolio-5c007.appspot.com",
  messagingSenderId: "480633758008",
  appId: "1:480633758008:web:f1856f2846ee426b8d61cd",
  measurementId: "G-2431E8Q30H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
