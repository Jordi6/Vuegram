import Vue, { onBeforeMount } from "vue";
import { createApp, h } from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import "./assets/SCSS/app.scss";




let app

auth.onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App)
    app.use(store).use(router).mount('#app')
  }
})
