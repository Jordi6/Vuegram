import Vue, { onBeforeMount } from "vue";
import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import "./assets/SCSS/app.scss";
import VueFinalModal from 'vue-final-modal'



let app

auth.onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App)
    app.use(store).use(router).use(VueFinalModal(), {
      componentName: 'VueFinalModal',
      key: '$vfm',    
      dynamicContainerName: 'ModalsContainer'
    }).mount('#app')
  }
  if (user) {
    // store.dispatch('fetchUserProfile', user)
  }
})


