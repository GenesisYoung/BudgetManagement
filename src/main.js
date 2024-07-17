import './assets/base.css'
// Add the necessary CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'



import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './data/vuex'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faGauge,faList,faGear,faBars,faWallet,faCreditCard,faSackDollar,faHouse,faDollarSign,faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
/* import bootstrap */ 
import {createBootstrap} from 'bootstrap-vue-next'




const app = createApp(App)


app.use(router)
app.use(store)
app.use(createBootstrap()) // Important bootstrap


// fontAwesome config
library.add(faGauge)
library.add(faList)
library.add(faGear)
library.add(faBars)
library.add(faWallet)
library.add(faCreditCard)
library.add(faSackDollar)
library.add(faHouse)
library.add(faDollarSign)
library.add(faRectangleXmark)

app.config.productionTip = false
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
