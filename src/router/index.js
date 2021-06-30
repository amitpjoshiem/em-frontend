import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '@/layouts/Home.vue'
import Login from '@/layouts/Login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
      },
      {
        path: 'new-prospect',
        name: 'newprospect',
        component: () =>
          import(
            /* webpackChunkName: "newprospect" */ '../views/NewProspect.vue'
          ),
        children: [
          {
            path: 'basic',
            name: 'basic-information',
            component: () =>
              import(
                /* webpackChunkName: "newprospect" */ '../components/NewProspect/NewProspectBasic.vue'
              ),
          },
          {
            path: 'assets',
            name: 'assets-information',
            component: () =>
              import(
                /* webpackChunkName: "newprospect" */ '../components/NewProspect/NewProspectAssets.vue'
              ),
          },
          {
            path: 'assets-acount',
            name: 'assetsacount',
            component: () =>
              import(
                /* webpackChunkName: "newprospect" */ '../components/NewProspect/NewProspectAssetsAccounts.vue'
              ),
          },
          {
            path: 'assets-consolidations',
            name: 'assetsconsolidations',
            component: () =>
              import(
                /* webpackChunkName: "newprospect" */ '../components/NewProspect/NewProspectAssetsConsolidations.vue'
              ),
          },
          {
            path: '',
            redirect: () => {
              return { name: 'basic-information' }
            },
          },
        ],
      },

      {
        path: 'blue-report',
        name: 'bluereport',
        component: () =>
          import(
            /* webpackChunkName: "newprospect" */ '../components/NewProspect/NewProspectBlueReport.vue'
          ),
      },

      {
        path: '',
        redirect: () => {
          return { name: 'dashboard' }
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { publicRoute: true },
    children: [
      {
        path: '',
        name: 'loginform',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../components/LoginForm.vue'
          ),
      },
      {
        path: 'forgot',
        name: 'forgotpassword',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../components/ForgotPassword.vue'
          ),
      },
      {
        path: 'password-reset',
        name: 'newpassword',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../components/NewPassword.vue'
          ),
      },
    ],
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
