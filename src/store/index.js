import { createApp } from 'vue'
import { createStore } from 'vuex'
import * as fb from '../firebase'
import { doc, setDoc } from "firebase/firestore"; 
import router from '../router/index'


const store = new createStore({
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    }
  },
  actions: {
    // sign user out
    async logout({ dispatch }, user ) {
      fb.auth.signOut()
      router.push('/login')
    },
    async login({ dispatch }, form) {
      // sign user in
      var user = {};
      await fb.auth.signInWithEmailAndPassword(form.email, form.password)
        .then((data) => {
          user = data.user
          console.log(data)
        })
        .catch((err) => {
          alert(err.message)
        });
      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userRef = fb.userCollection.doc(user.uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
      }
      // set user profile in state
      commit('setUserProfile', doc.data())

      // change route to dashboard
      router.push('/')
    },
    async signup({ dispatch }, form) {
      var user = {};
      await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
        .then((data) => {
        // signed in 
        const userId = data.user.uid;
        user = data.user;
        //for testing console.log("user1: " + userId + " user2: " + user.uid);
        
        // create user profile object in userCollections
        fb.userCollection.doc(userId).set({
          name: form.name,
          title: form.title
        })

        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
          alert(error);
        });
        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
    }
  }
})

export default store
