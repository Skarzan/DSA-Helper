import * as firebase from "firebase/app";
import "firebase/firestore";
import credentials from "./credentials";

console.log("Test");
var firebaseConfig = credentials;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export default db;
