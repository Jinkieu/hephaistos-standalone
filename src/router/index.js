import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Modules from '../components/Modules.vue'
import store from '../store/index'
import Module from '../components/Module.vue'
import Exercises from '../components/Exercises.vue'

Vue.use(VueRouter)
async function beforeEnter (_to, _from, next) {
  if (!store.getters['user/isAuthenticated']) {
    await store.dispatch('user/fetchUser')
  }
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'modules',
    component: Modules,
    beforeEnter
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/module/:moduleId',
    name: 'module',
    component: Module,
    beforeEnter
  },
  {
    path: '/session/:sessionId/exercise/:exerciseId',
    name: 'exercises',
    component: Exercises,
    beforeEnter
  }
]

export default new VueRouter({ routes })
