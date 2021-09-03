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
            path: 'basic/:id?',
            name: 'basic-information',
            component: () =>
              import(
                /* webpackChunkName: "newprospect" */ '../components/NewProspect/AddProspectBasicInfo.vue'
              ),
          },
          {
            path: 'assets/:id?',
            name: 'assets-information',
            component: () =>
              import(
                /* webpackChunkName: "newprospect" */ '../components/NewProspect/AddProspectAssets.vue'
              ),
          },
          {
            path: 'assets-acount/:id?',
            name: 'assetsacount',
            component: () =>
              import(
                /* webpackChunkName: "newprospect" */ '../components/NewProspect/NewProspectAssetsAccounts.vue'
              ),
          },
          {
            path: 'assets-consolidations/:id?',
            name: 'assetsconsolidations',
            component: () =>
              import(
                /* webpackChunkName: "newprospect" */ '../components/NewProspect/NewProspectAssetsConsolidations.vue'
              ),
          },
          {
            path: 'stress-test/:id?',
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
        path: 'blue-report/:id',
        name: 'bluereport',
        component: () =>
          import(
            /* webpackChunkName: "newprospect" */ '../components/NewProspect/NewProspectBlueReport.vue'
          ),
      },
      {
        path: 'client-report/:id',
        name: 'clientreport',
        component: () =>
          import(
            /* webpackChunkName: "clientreport" */ '../components/ClientReport/ClientReport.vue'
          ),
      },
      {
        path: 'list-of-households',
        name: 'list-of-households',
        component: () =>
          import(
            /* webpackChunkName: "ListOfHouseholds" */ '../views/ListOfHouseholds.vue'
          ),
        children: [
          {
            path: 'all',
            name: 'all',
            component: () =>
              import(
                /* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListAll.vue'
              ),
          },
          {
            path: 'prospects',
            name: 'prospects',
            component: () =>
              import(
                /* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListProspects.vue'
              ),
          },
          {
            path: 'clients',
            name: 'clients',
            component: () =>
              import(
                /* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListClients.vue'
              ),
          },
        ],
      },

      {
        path: 'member-details/:id',
        name: 'member-details',
        component: () =>
          import(
            /* webpackChunkName: "MemberDetails" */ '../components/MemberDetails/MemberDetails.vue'
          ),
      },

      {
        path: 'member-basic-information/:id',
        name: 'member-basic-information',
        component: () =>
          import(
            /* webpackChunkName: "MemberDetails" */ '../components/MemberBasicInformation/MemberBasicInformation.vue'
          ),
      },
      {
        path: 'prospect-employment/:id',
        name: 'prospect-employment',
        component: () =>
          import(
            /* webpackChunkName: "MemberDetails" */ '../components/EmploymentHistory/EmploymentHistory.vue'
          ),
      },

      {
        path: 'add-opportunity/:id',
        name: 'add-opportunity',
        component: () =>
          import(
            /* webpackChunkName: "Opportunity" */ '../components/Opportunity/AddOpportunity.vue'
          ),
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
                /* webpackChunkName: "settings" */ '../components/Settings/ProfileSettings.vue'
              ),
          },
          {
            path: 'notifications',
            name: 'notifications',
            component: () =>
              import(
                /* webpackChunkName: "settings" */ '../components/Settings/NotificationsSettings.vue'
              ),
          },
          {
            path: 'information',
            name: 'information',
            component: () =>
              import(
                /* webpackChunkName: "settings" */ '../components/Settings/InformationSettings.vue'
              ),
          },
          {
            path: '2fa',
            name: '2fa',
            component: () =>
              import(
                /* webpackChunkName: "settings" */ '../components/Settings/TwoFA.vue'
              ),
          },
          {
            path: 'salesforce',
            name: 'salesforce',
            component: () =>
              import(
                /* webpackChunkName: "settings" */ '../components/Settings/SalesForceSettings.vue'
              ),
          },
        ],
      },

      {
        path: 'logout',
        name: 'logout',
        component: () =>
          import(/* webpackChunkName: "logout" */ '../views/Logout.vue'),
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
      {
        path: 'otp',
        name: 'otp',
        component: () =>
          import(
            /* webpackChunkName: "login" */ '../components/Login/OtpForm.vue'
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
