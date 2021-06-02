import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Flex from '../views/Flex.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
      },
    ],
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { publicRoute: true },
  },
  {
    path: '/flex',
    name: 'Flex',
    component: Flex,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  if (to.meta.publicRoute) {
    return true
  }
  if (!store.state.auth.isAuth) {
    return '/login'
  }
  return true
})

export default router
