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
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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

