import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// FA
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faCartShopping, faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faCartShopping, faBars, faRightFromBracket);

//Setup
const app = createApp(App);
app.use(store)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
