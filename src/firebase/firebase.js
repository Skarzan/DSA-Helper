import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";
import credentials from "./credentials";

var firebaseConfig = credentials;

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
