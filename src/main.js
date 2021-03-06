import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import "./assets/SCSS/app.scss";
import VueFinalModal from 'vue-final-modal'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

// /* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from '@fortawesome/free-regular-svg-icons'


library.add(fas, far)


let app

  auth.onAuthStateChanged((user) => {
    if (!app) {
      app = createApp(App);
      app
      .use(store)
      .use(router)
      .component("font-awesome-icon", FontAwesomeIcon)
      .use(VueFinalModal(), {
        componentName: 'VueFinalModal',
        key: '$vfm',    
        dynamicContainerName: 'ModalsContainer'
      })
      .mount('#app')
    }
    
    if (user) {
      store.dispatch('fetchUserProfile', user);
      store.dispatch('fetchPosts', user);
    }

  });