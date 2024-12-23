// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Realtime Database
import { getAuth } from "firebase/auth";

//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfCGebwh5vg4it9Nt9EWtQ3hZDEQjI-xw",
  authDomain: "labexam-e5538.firebaseapp.com",
  projectId: "labexam-e5538",
  storageBucket: "labexam-e5538.firebasestorage.app",
  messagingSenderId: "337296525640",
  appId: "1:337296525640:web:67afd514f9da174fefcb7d",
  measurementId: "G-N92XXF4HPJ",
  databaseURL:"https://labexam-e5538-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);
// Export the Firebase app and database
export { app, auth,getDatabase };

