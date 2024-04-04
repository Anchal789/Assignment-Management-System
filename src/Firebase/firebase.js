// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: "assignment-management-sy-4020d.firebaseapp.com",
  projectId: "assignment-management-sy-4020d",
  storageBucket: "assignment-management-sy-4020d.appspot.com",
  messagingSenderId: "983140271210",
  appId: process.env.REACT_APP_ID,
  databaseURL : process.env.REACT_APP_DATABASE_URL
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);