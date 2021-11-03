import { createStore } from "vuex";
import * as fb from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import router from "../router/index";



// realtime firebase connection
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setPosts', postsArray)
})



const store = new createStore({
  state: {
    userProfile: {},
    posts: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPosts(state, val) {
      state.posts = val
    }
  },
  actions: {
    // sign user out
    async logout({ commit }) {
      await fb.auth.signOut();

      // clear userProfile and redirect to /login
      commit("setUserProfile", {});
      router.push("/login");
    },
    async login({ dispatch }, form) {
      // sign user in
      var user = {};
      await fb.auth
        .signInWithEmailAndPassword(form.email, form.password)
        .then((data) => {
          user = data.user;
        })
        .catch((err) => {
          alert(err.message);
        });
      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userRef = fb.userCollection.doc(user.uid);
      const doc = await userRef.get();
     
      // set user profile in state
      commit("setUserProfile", doc.data());

      // change route to dashboard
      if (router.currentRoute.value.path == "/login") {
        router.push('/');
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
          // ...
          alert(error);
        });
      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async createPost({ state, commit }, post) {
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0
      })
    },
    async likePost({ commit }, post) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) { return }

      // create post
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId
      })

      // update post likes count
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1
      })
    },
    async updateProfile({dispatch}, user) {
      const userId = fb.auth.currentUser.uid
      // update user object
      const userRef = await fb.userCollection.doc(userId).update({
        name: user.name,
        title: user.title
      })

      dispatch('fetchUserProfile', { uid: userId })

      // update all posts by user 
      const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
      postDocs.forEach(doc => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name
        })
      })

      // update all coments by user 
      const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
      commentDocs.forEach(doc => {
        fb.commentsCollection.doc(doc.id).update({
          userName: user.name
        })
      })
    }
  },
});

export default store
