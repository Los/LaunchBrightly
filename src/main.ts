import {createApp} from 'vue'
import App from './App.vue'

// Font Awesome library
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* Font Awesome Icons */
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faMoon, faSun)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
