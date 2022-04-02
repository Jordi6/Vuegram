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

<<<<<<< HEAD

=======
>>>>>>> 9a16b57 (image file chosen, previewed and uploaded to the cloud (firestore))

let app

  auth.onAuthStateChanged((user) => {
    if (!app) {
      app = createApp(App)
<<<<<<< HEAD
      app
      .component("font-awesome-icon", FontAwesomeIcon)
      .use(store)
      .use(router)
      .use(VueFinalModal(), {
=======
      app.use(store).use(router).use(VueFinalModal(), {
>>>>>>> 9a16b57 (image file chosen, previewed and uploaded to the cloud (firestore))
        componentName: 'VueFinalModal',
        key: '$vfm',    
        dynamicContainerName: 'ModalsContainer'
      })
      .mount('#app')
    }
    if (user) {
      store.dispatch('fetchUserProfile', user)
    }
  })
  

  