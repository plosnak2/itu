// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";

import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCskFwS8-Sy1n7JGzBQg5Z0TMtY86RmpDs",
  authDomain: "itu-kucharka.firebaseapp.com",
  projectId: "itu-kucharka",
  storageBucket: "itu-kucharka.appspot.com",
  messagingSenderId: "394733085467",
  appId: "1:394733085467:web:229b244968c5fc11f9e9be"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = firebase.firestore(app);

export const RecipeRef = db.collection("recipe");

export {firebase};

