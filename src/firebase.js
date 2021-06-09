import { firebase } from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "#",
    authDomain: "#",
    projectId: "#",
    storageBucket: "#",
    messagingSenderId: "#",
    appId: "#",
    measurementId: "#"
  }


firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const userCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
    db,
    auth,
    userCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}


