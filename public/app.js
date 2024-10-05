import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const { default: firebase } = require("firebase/compat/app");
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlag6nKf0pSRNhOtfP5UNIuK3tOn7I5a8",
  authDomain: "map-it-fee3b.firebaseapp.com",
  projectId: "map-it-fee3b",
  storageBucket: "map-it-fee3b.appspot.com",
  messagingSenderId: "466109228008",
  appId: "1:466109228008:web:99257b389800648d9c3a5d",
  measurementId: "G-LVCDK5CPB0"
};

document.addEventListener("DOMContentLoaded",event =>{

    const app = firebase.app();
    if (app){
        console.log("linked to Firebase")
        console.log(app)
    }
    else{
        console.log("not linked to Firebase")
    }
    
})
