import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import "./assets/SCSS/app.scss";
import VueFinalModal from 'vue-final-modal'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
<<<<<<< HEAD
=======

// /* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from '@fortawesome/free-regular-svg-icons'


library.add(fas, far)

>>>>>>> 967dadd (adding images to posts. also can delete and edit posts.)

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
<<<<<<< HEAD
=======
>>>>>>> 967dadd (adding images to posts. also can delete and edit posts.)
      app
      .component("font-awesome-icon", FontAwesomeIcon)
      .use(store)
      .use(router)
      .use(VueFinalModal(), {
<<<<<<< HEAD
=======
      app.use(store).use(router).use(VueFinalModal(), {
>>>>>>> 9a16b57 (image file chosen, previewed and uploaded to the cloud (firestore))
=======
>>>>>>> 967dadd (adding images to posts. also can delete and edit posts.)
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
  

  