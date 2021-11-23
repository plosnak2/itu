// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";

import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbGdikQekczc39Yk2xeLwCybXdzgGkCtQ",
  authDomain: "itu-proj-7551d.firebaseapp.com",
  projectId: "itu-proj-7551d",
  storageBucket: "itu-proj-7551d.appspot.com",
  messagingSenderId: "837052797351",
  appId: "1:837052797351:web:e378a5833811f104812682",
  measurementId: "G-G4F5RZGZM7"
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

export const UsersRef = db.collection("users");

export const IngredientRef = db.collection("ingredient");

export {firebase};

