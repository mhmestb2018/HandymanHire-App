import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA6FNeLxw_LXGRb8owxWb67bty_c9hoqkw",
    authDomain: "handymanhire-fccd5.firebaseapp.com",
    databaseURL: "https://handymanhire-fccd5.firebaseio.com",
    projectId: "handymanhire-fccd5",
    storageBucket: "handymanhire-fccd5.appspot.com",
    messagingSenderId: "385823584484",
    appId: "1:385823584484:web:458071d9f85d8827"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;