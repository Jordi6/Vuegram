import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
<<<<<<< HEAD
    apiKey: "AIzaSyDi-QvgQCd8QdF9wbnMuvV-V6H35sBDGKU",
    authDomain: "vuegram-c469c.firebaseapp.com",
    projectId: "vuegram-c469c",
    storageBucket: "vuegram-c469c.appspot.com",
    messagingSenderId: "22037694890",
    appId: "1:22037694890:web:e6920b2ed1f67dcddbc3d3",
    measurementId: "G-91420S3DVR"
  }
=======
  apiKey: "AIzaSyDi-QvgQCd8QdF9wbnMuvV-V6H35sBDGKU",
  authDomain: "vuegram-c469c.firebaseapp.com",
  projectId: "vuegram-c469c",
  storageBucket: "vuegram-c469c.appspot.com",
  messagingSenderId: "22037694890",
  appId: "1:22037694890:web:e6920b2ed1f67dcddbc3d3",
  measurementId: "G-91420S3DVR",
};
>>>>>>> ef33c87a23bda866b774fab771d7d8f78c61278d

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const userCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

// firebase google auth
var provider = new firebase.auth.GoogleAuthProvider();

// export utils/refs
export {
  db,
  auth,
  userCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
  provider,
};
