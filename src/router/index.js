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
            path: 'stress-test',
            name: 'stresstest',
            component: () =>
              import(
                /* webpackChunkName: "newprospect" */ '../components/NewProspect/NewProspectStressTest.vue'
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
            /* webpackChunkName: "dashboard" */ '../components/Login/LoginForm.vue'
          ),
      },
      {
        path: 'forgot',
        name: 'forgotpassword',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../components/Login/ForgotPassword.vue'
          ),
      },
      {
        path: 'reset-password',
        name: 'resetpassword',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../components/Login/ResetPassword.vue'
          ),
      },
      {
        path: 'new-password',
        name: 'newpassword',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../components/Login/CreateNewPassword.vue'
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
