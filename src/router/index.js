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
        path: 'blue-report',
        name: 'bluereport',
        component: () =>
          import(
            /* webpackChunkName: "newprospect" */ '../components/NewProspect/NewProspectBlueReport.vue'
          ),
      },
      {
        path: 'list-of-households',
        name: 'list-of-households',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/ListOfHouseholds.vue'
          ),
        children: [
          {
            path: 'list-all',
            name: 'list-all',
            component: () =>
              import(
                /* webpackChunkName: "newprospect" */ '../components/ListOfHouseholds/ListAll.vue'
              ),
          },
          {
            path: 'list-prospects',
            name: 'list-prospects',
            component: () =>
              import(
                /* webpackChunkName: "newprospect" */ '../components/ListOfHouseholds/ListProspects.vue'
              ),
          },
          {
            path: 'list-clients',
            name: 'list-clients',
            component: () =>
              import(
                /* webpackChunkName: "newprospect" */ '../components/ListOfHouseholds/ListClients.vue'
              ),
          },
        ],
      },

      {
        path: 'settings',
        name: 'settings',
        component: () =>
          import(
            /* webpackChunkName: "settings" */ '../components/Settings/Settings.vue'
          ),
        children: [
          {
            path: 'profile',
            name: 'profile',
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '../components/Settings/ProfileSettings.vue'
              ),
          },
          {
            path: 'notifications',
            name: 'notifications',
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '../components/Settings/NotificationsSettings.vue'
              ),
          },
          {
            path: 'information',
            name: 'information',
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '../components/Settings/InformationSettings.vue'
              ),
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
            /* webpackChunkName: "login" */ '../components/Login/LoginForm.vue'
          ),
      },
      {
        path: 'forgot',
        name: 'forgotpassword',
        component: () =>
          import(
            /* webpackChunkName: "login" */ '../components/Login/ForgotPassword.vue'
          ),
      },
      {
        path: 'reset-password',
        name: 'resetpassword',
        component: () =>
          import(
            /* webpackChunkName: "login" */ '../components/Login/ResetPassword.vue'
          ),
      },
      {
        path: 'create-password',
        name: 'createpassword',
        component: () =>
          import(
            /* webpackChunkName: "login" */ '../components/Login/ResetPassword.vue'
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
