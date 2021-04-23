import { firebase } from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


// Your web app's Firebase configuration
// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyBlsQ5HjUylhVWXyWwwLg55TyyNqoTSU4g",
    authDomain: "vuegram-c469c.firebaseapp.com",
    projectId: "vuegram-c469c",
    storageBucket: "vuegram-c469c.appspot.com",
    messagingSenderId: "22037694890",
    appId: "1:22037694890:web:e6920b2ed1f67dcddbc3d3",
    measurementId: "G-91420S3DVR"
  }

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
//firebase.analytics()

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const userCollection = db.collection('users')
const postCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
    db,
    auth,
    userCollection,
    postCollection,
    commentsCollection,
    likesCollection
}


