import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueAxios from 'vue-axios'
import axios from 'axios'
import createRouter from './router/routes'

axios.defaults.withCredentials = true // this line here !

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

const state = {
  user: {}
}

new Vue({
  data: state,
  router: createRouter(state),
  vuetify,
  render: h => h(App)
}).$mount('#app')
