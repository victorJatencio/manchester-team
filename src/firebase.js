import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD-fApjxl53Bnhxce2HaCmy64ZG9lnFOtE",
  authDomain: "m-city-77a9c.firebaseapp.com",
  databaseURL: "https://m-city-77a9c.firebaseio.com",
  projectId: "m-city-77a9c",
  storageBucket: "m-city-77a9c.appspot.com",
  messagingSenderId: "331874609547",
  appId: "1:331874609547:web:d9d3d43d0752fc566ee78e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebase_db = firebase.database();
const firebaseMatches = firebase_db.ref("matches");
const firebasePromotions = firebase_db.ref("promotions");

export { firebase, firebaseMatches, firebasePromotions };
