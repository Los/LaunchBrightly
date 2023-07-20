//axios
import {createApp} from 'vue'
import App from './App.vue'
import '@/assets/style.css'

// Font Awesome library
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* Font Awesome Icons */
import {
  faFilter,
  faMoon,
  faSort,
  faSortDown,
  faSortUp,
  faSpinner,
  faSun,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faMoon, faSun, faSpinner, faSortDown, faSort, faSortUp, faFilter, faXmark)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
