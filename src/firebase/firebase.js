import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";
import credentials from "./credentials";

console.log("Test");
var firebaseConfig = credentials;

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
