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
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
      },
      {
        path: 'new-prospect',
        name: 'newprospect',
        component: () => import(/* webpackChunkName: "NewProspect" */ '../views/NewProspect.vue'),
        children: [
          {
            path: 'basic/:id?',
            name: 'basic-information',
            component: () =>
              import(/* webpackChunkName: "NewProspect" */ '../components/NewProspect/AddProspectBasicInfo.vue'),
          },
          {
            path: 'assets/:id?',
            name: 'assets-information',
            component: () =>
              import(/* webpackChunkName: "NewProspect" */ '../components/NewProspect/AddProspectAssets.vue'),
          },
          {
            path: 'assets-acount/:id?',
            name: 'assetsacount',
            component: () =>
              import(/* webpackChunkName: "NewProspect" */ '../components/NewProspect/NewProspectAssetsAccounts.vue'),
          },
          {
            path: 'assets-consolidations/:id?',
            name: 'assetsconsolidations',
            component: () =>
              import(
                /* webpackChunkName: "NewProspect" */ '../components/NewProspect/AssetsConsolidations/AssetsConsolidations.vue'
              ),
          },
          {
            path: 'stress-test/:id?',
            name: 'stresstest',
            component: () =>
              import(/* webpackChunkName: "NewProspect" */ '../components/NewProspect/NewProspectPdf.vue'),
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
        path: 'member-report/:id',
        name: 'member-report',
        component: () => import(/* webpackChunkName: "MemberReport" */ '../components/Report/MemberReport.vue'),
      },
      {
        path: 'client-report/:id',
        name: 'clientreport',
        component: () => import(/* webpackChunkName: "clientreport" */ '../components/ClientReport/ClientReport.vue'),
      },
      {
        path: 'list-of-households',
        name: 'list-of-households',
        component: () => import(/* webpackChunkName: "ListOfHouseholds" */ '../views/ListOfHouseholds.vue'),
        children: [
          {
            path: 'all',
            name: 'all',
            component: () =>
              import(/* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListAll.vue'),
          },
          {
            path: 'prospects',
            name: 'prospects',
            component: () =>
              import(/* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListProspects.vue'),
          },
          {
            path: 'clients',
            name: 'clients',
            component: () =>
              import(/* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListClients.vue'),
          },
        ],
      },

      {
        path: 'activity',
        name: 'activity',
        component: () => import(/* webpackChunkName: "Activity" */ '../views/Activity.vue'),
      },
      {
        path: 'pipeline',
        name: 'pipeline',
        component: () => import(/* webpackChunkName: "Activity" */ '../views/PipeLine.vue'),
      },

      {
        path: 'member-details/:id',
        name: 'member-details',
        component: () =>
          import(/* webpackChunkName: "MemberDetails" */ '../components/MemberDetails/MemberDetails.vue'),
      },

      {
        path: 'asset-allocation-details/:id',
        name: 'asset-allocation-details',
        component: () =>
          import(/* webpackChunkName: "AssetAllocation" */ '../components/AssetAllocation/AssetAllocationDetails.vue'),
      },

      {
        path: 'asset-accounts/:id',
        name: 'asset-accounts',
        component: () =>
          import(/* webpackChunkName: "AssetAccounts" */ '../components/AssetAccounts/AssetAccounts.vue'),
      },
      {
        path: 'asset-allocation-details/:id',
        name: 'asset-allocation-details',
        component: () =>
          import(/* webpackChunkName: "MemberDetails" */ '../components/AssetAllocation/AssetAllocationDetails.vue'),
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
          import(/* webpackChunkName: "MemberDetails" */ '../components/EmploymentHistory/EmploymentHistory.vue'),
      },

      {
        path: 'add-opportunity/:id',
        name: 'add-opportunity',
        component: () => import(/* webpackChunkName: "Opportunity" */ '../components/Opportunity/AddOpportunity.vue'),
      },

      {
        path: 'settings-app',
        name: 'settings-app',
        component: () => import(/* webpackChunkName: "Settings" */ '../components/Settings/SettingsApp.vue'),
        children: [
          {
            path: 'profile',
            name: 'profile',
            component: () => import(/* webpackChunkName: "Settings" */ '../components/Settings/ProfileSettings.vue'),
          },
          {
            path: 'information',
            name: 'information',
            component: () =>
              import(/* webpackChunkName: "Settings" */ '../components/Settings/InformationSettings.vue'),
          },
          {
            path: 'partners',
            name: 'partners',
            component: () => import(/* webpackChunkName: "Settings" */ '../components/Settings/Partners.vue'),
          },
          {
            path: 'settings',
            name: 'settings',
            component: () => import(/* webpackChunkName: "Settings" */ '../components/Settings/Settings.vue'),
          },
        ],
      },

      {
        path: 'logout',
        name: 'logout',
        component: () => import(/* webpackChunkName: "Logout" */ '../views/Logout.vue'),
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
        component: () => import(/* webpackChunkName: "Login" */ '../components/Login/LoginForm.vue'),
      },
      {
        path: 'forgot',
        name: 'forgotpassword',
        component: () => import(/* webpackChunkName: "Login" */ '../components/Login/ForgotPassword.vue'),
      },
      {
        path: 'password-reset',
        name: 'passwordreset',
        component: () => import(/* webpackChunkName: "Login" */ '../components/Login/ResetPassword.vue'),
        props: { context: 'reset' },
      },
      {
        path: 'password-create',
        name: 'passwordcreate',
        component: () => import(/* webpackChunkName: "Login" */ '../components/Login/ResetPassword.vue'),
        props: { context: 'create' },
      },
      {
        path: 'otp',
        name: 'otp',
        component: () => import(/* webpackChunkName: "Login" */ '../components/Login/OtpForm.vue'),
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
