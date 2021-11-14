// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };