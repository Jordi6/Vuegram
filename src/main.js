import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import "./assets/SCSS/app.scss";
import VueFinalModal from 'vue-final-modal'


import { createVuetify } from 'vuetify'
// import 'vuetify/styles' // Global CSS has to be imported
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'


let app
const vuetify = createVuetify({
  // components,
  // directives
})

  auth.onAuthStateChanged((user) => {
    if (!app) {
      app = createApp(App)
      app.use(store).use(router).use(vuetify).use(VueFinalModal(), {
        componentName: 'VueFinalModal',
        key: '$vfm',    
        dynamicContainerName: 'ModalsContainer'
      }).mount('#app')
    }
    if (user) {
      store.dispatch('fetchUserProfile', user)
    }
  })
  

  