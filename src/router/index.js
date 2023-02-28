import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '@/layouts/Home.vue'
import ability from '../services/ability'

import { useSetInit } from '@/hooks/use-set-init'
import { useSetUpdateAbility } from '@/hooks/use-set-update-ability'

import { clientRoute } from './modules/clientRoute'
import { leadRoute } from './modules/leadRoute'
import { adminRoute } from './modules/adminRoute'
import { ceoRoute } from './modules/ceoRoute'
import { advisorRoute } from './modules/advisorRoute'
import { apRouteAdmin } from './modules/apRouteAdmin'
import { apRouteCeo } from './modules/apRouteCeo'
import { supportRoute } from './modules/supportRoute'
import { settingsRoute } from './modules/settingsRoute'
import { loginRoute } from './modules/loginRoute'

const routes = [
  clientRoute,
  leadRoute,
  adminRoute,
  ceoRoute,
  advisorRoute,
  apRouteAdmin,
  apRouteCeo,
  supportRoute,
  settingsRoute,
  loginRoute,

  {
    path: '/telegram-login',
    name: 'telegram-login',
    component: () => import(/* webpackChunkName: "Forbidden" */ '../views/TelegramLogin.vue'),
  },

  {
    path: '/403',
    name: '403',
    component: () => import(/* webpackChunkName: "Forbidden" */ '../views/Forbidden.vue'),
  },

  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "PageNotFound" */ '../views/PageNotFound.vue'),
  },

  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "Logout" */ '../views/Logout.vue'),
  },

  {
    path: '/terms',
    name: 'terms',
    component: () => import(/* webpackChunkName: "TermsConditions" */ '../views/TermsConditions.vue'),
  },

  {
    path: '/',
    name: 'home',
    component: Home,
  },
]

function getCanNavigate(item) {
  const rrr = Object.entries(item)
  return ability.can(...rrr[0])
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  if (to.meta.publicRoute) {
    return true
  }

  const { setInit } = useSetInit()
  const { setUpdateAbility } = useSetUpdateAbility()

  if (store.state.auth.isAuth && !store.state.globalComponents.currentCompanyId && !store.state.globalComponents.role) {
    await setInit(to)
  }

  if (!ability.rules.length) {
    await setUpdateAbility()
  }

  if (to.meta && to.meta.type) {
    store.commit('globalComponents/setCurrentTypeUser', to.meta.type)
  }

  const canNavigate = to.matched.some((route) => {
    if (route.meta.resource) return route.meta.resource.some(getCanNavigate)
  })

  if (!store.state.auth.isAuth) {
    return '/login'
  }

  if (!canNavigate && to.meta.resource) {
    return '/403'
  }

  return true
})

export default router
