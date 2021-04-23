import Vue from "vue";
import { createApp, h } from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import "./assets/SCSS/app.scss";



let app = createApp(App)


// if App is true it has rendred

auth.onAuthStateChanged(() => {
  if (!App) {
    app = createApp(App)
    app.use(store)
    .use(router)
    .$mount('#app')
  }
  app.use(store).use(router).mount('#app')
})

