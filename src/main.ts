//axios
import {createApp} from 'vue'
import App from './App.vue'
import '@/assets/style.css'

// Font Awesome library
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* Font Awesome Icons */
import {faMoon, faSort, faSortDown, faSortUp, faSpinner, faSun} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faMoon, faSun, faSpinner, faSortDown, faSort, faSortUp)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
