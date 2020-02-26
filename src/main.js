import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueAxios from 'vue-axios'
import axios from 'axios'
import createRouter from './routes'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

// const router = new VueRouter({ createRouter })

const state = {
  user: {}
}

new Vue({
  data: state,
  router: createRouter(state),
  vuetify,
  render: h => h(App)
}).$mount('#app')
