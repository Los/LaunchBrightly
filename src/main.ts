//axios
import {createApp} from 'vue'
import App from './App.vue'
import '@/assets/style.css'

// Font Awesome library
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* Font Awesome Icons */
import {faMoon, faSpinner, faSun} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faMoon, faSun, faSpinner)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
