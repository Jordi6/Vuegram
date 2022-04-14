import { createStore } from "vuex";
import * as fb from "../firebase";
import { provider } from "../firebase";
import router from "../router/index";
import firebase from "firebase/compat/app";
import { doc, setDoc, addDoc, set } from "firebase/firestore"; 



// realtime firebase connection
fb.postsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
  let postsArray = [];

  snapshot.forEach((doc) => {
    let post = doc.data();
    post.id = doc.id;
    postsArray.push(post);
  });

  store.commit("setPosts", postsArray);
});


const store = new createStore({
  state: {
    // userProfile = {name: , title: };
    userProfile: {},
    posts: [],
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPosts(state, val) {
      val.forEach(p => {
        if (fb.auth.currentUser.uid == p.userId) {
          p.editable = true;
        }
        else {
          p.editable = false;
        }
      });

      state.posts = val;
      
    },
  },
  actions: {
    async signInWithGoogle({ commit }) {
      var userObj = { name: null, title: null };
      // sign-in with google popup
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
          // var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;

          userObj.name = user.displayName;
          var docRef = fb.userCollection.doc(user.uid);

          docRef
            .get()
            .then((doc) => {
              if (!doc.exists) {
                fb.userCollection.doc(user.uid).set({
                  name: userObj.name,
                  title: userObj.title,
                });
              }
              this.dispatch("fetchUserProfile", user);
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          alert("Error logging in with google:" + errorCode);
          alert("Error message:" + errorMessage);
        });
    },
    // logout user
    async logout({ commit }) {
      await fb.auth.signOut();

      commit("setUserProfile", {});
      router.push("/login");
    },
    // log in user
    async login({ dispatch }, form) {
      var user = {};
      await fb.auth
        .signInWithEmailAndPassword(form.email, form.password)
        .then((data) => {
          user = data.user;
        })
        .catch((err) => {
          alert(err.message);
        });
      dispatch("fetchUserProfile", user);
    },
    // fetch user profile and set in state
    async fetchUserProfile({ commit }, user) {
      const userRef = fb.userCollection.doc(user.uid);
      const doc = await userRef.get();

      // getting name and title obj from firestore db.
      // then calling set user profile to set in store state
      commit("setUserProfile", doc.data());

      if (router.currentRoute.value.path == "/login") {
        router.push("/");
      }
    },
    async signup({ dispatch }, form) {
      var user = {};
      await fb.auth
        .createUserWithEmailAndPassword(form.email, form.password)
        .then((data) => {
          // signed in
          const userId = data.user.uid;
          user = data.user;

          // create user profile object in userCollections
          fb.userCollection.doc(userId).set({
            name: form.name,
            title: form.title,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          alert(errorCode + ", " + errorMessage);
        });
      dispatch("fetchUserProfile", user);
    },

    // new post
    async createPost({ state, commit }, post) {
      await setDoc(doc(fb.postsCollection),{
        createdOn: new Date(),
        image: post.image,
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0,
      }).then((data) => {
        console.log(data + "There was an erro creating the post.");
      });
    },
    // update post
    async updatePost({ state, commit }, post) {
      await setDoc(doc(fb.postsCollection, post.id),{
        createdOn: new Date(),
        image: post.image,
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0,
      }).then((data) => {
        console.log(data + "There was an erro updating the post.");
      });
    },

    async likePost({ commit }, post) {
      const userId = fb.auth.currentUser.uid;
      const docId = userId + "_" + post.id;

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get();
      if (doc.exists) {
        return;
      }

      // create like for the post, from this user
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId,
      });

      // update post likes count
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1,
      });
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid;
      // update user object
      const userRef = await fb.userCollection.doc(userId).update({
        name: user.name,
        title: user.title,
      });

      dispatch("fetchUserProfile", { uid: userId });

      // update all posts by user
      const postDocs = await fb.postsCollection
        .where("userId", "==", userId)
        .get();
      postDocs.forEach((doc) => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name,
        });
      });

      // update all coments by user
      const commentDocs = await fb.commentsCollection
        .where("userId", "==", userId)
        .get();
      commentDocs.forEach((doc) => {
        fb.commentsCollection.doc(doc.id).update({
          userName: user.name,
        });
      });
    },
  },
});

export default store;
