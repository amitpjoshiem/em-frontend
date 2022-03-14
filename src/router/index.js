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
        path: 'document-export/:id',
        name: 'document-export',
        component: () =>
          import(
            /* webpackChunkName: "DocumentExport" */ '../components/AssetsConsolidations/Export/DocumentExport.vue'
          ),
      },

      {
        path: 'blueprint-report/:id',
        name: 'blueprint-report',
        component: () => import(/* webpackChunkName: "BlueprintReport" */ '../components/Report/BlueprintReport.vue'),
      },

      {
        path: 'client-report/:id',
        name: 'clientreport',
        component: () => import(/* webpackChunkName: "clientreport" */ '../components/ClientReport/ClientReport.vue'),
      },

      {
        path: 'contract-info/:id',
        name: 'contract-info',
        component: () => import(/* webpackChunkName: "ContractInfo" */ '../components/ClientReport/ContractInfo.vue'),
      },

      {
        path: 'activity',
        name: 'activity',
        component: () => import(/* webpackChunkName: "Activity" */ '../views/Activity.vue'),
      },

      {
        path: 'pipeline',
        name: 'pipeline',
        component: () => import(/* webpackChunkName: "PipeLine" */ '../views/PipeLine.vue'),
      },

      {
        path: 'member-details/:id',
        name: 'member-details',
        component: () =>
          import(/* webpackChunkName: "MemberDetails" */ '../components/MemberDetails/MemberDetails.vue'),
      },

      {
        path: 'past-stress-test/:id',
        name: 'past-stress-test',
        component: () =>
          import(
            /* webpackChunkName: "PastStressTestResults" */ '../components/MemberDetails/PastStressTestResults.vue'
          ),
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
        path: 'assets-consolidations/:id',
        name: 'assets-consolidations',
        component: () =>
          import(
            /* webpackChunkName: "AssetsConsolidations" */ '../components/AssetsConsolidations/AssetsConsolidations.vue'
          ),
      },

      {
        path: 'opportunity-contact/:id',
        name: 'opportunity-contact',
        component: () =>
          import(
            /* webpackChunkName: "PpportunityContact" */ '../components/OpportunityContact/OpportunityContact.vue'
          ),
      },

      {
        path: 'asset-allocation-details/:id',
        name: 'asset-allocation-details',
        component: () =>
          import(
            /* webpackChunkName: "AssetAllocationDtails" */ '../components/AssetAllocation/AssetAllocationDetails.vue'
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
          import(/* webpackChunkName: "ProspectEmployment" */ '../components/EmploymentHistory/EmploymentHistory.vue'),
      },

      {
        path: 'add-opportunity/:id',
        name: 'add-opportunity',
        component: () => import(/* webpackChunkName: "Opportunity" */ '../components/Opportunity/AddOpportunity.vue'),
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
              import(
                /* webpackChunkName: "NewProspect" */ '../components/NewProspect/ProspectAssets/AddProspectAssets.vue'
              ),
          },
          {
            path: 'monthly-expense/:id?',
            name: 'monthly-expense',
            component: () =>
              import(
                /* webpackChunkName: "NewProspect" */ '../components/NewProspect/AddMonthlyExpense/AddMonthlyExpense.vue'
              ),
          },
          {
            path: 'assets-account/:id?',
            name: 'assets-account',
            component: () =>
              import(/* webpackChunkName: "NewProspect" */ '../components/NewProspect/NewProspectAssetsAccounts.vue'),
          },
          {
            path: 'add-assets-consolidations/:id?',
            name: 'add-assets-consolidations',
            component: () =>
              import(
                /* webpackChunkName: "NewProspect" */ '../components/NewProspect/AddAssetsConsolidations/AddAssetsConsolidations.vue'
              ),
          },
          {
            path: 'stress-test/:id?',
            name: 'stresstest',
            component: () =>
              import(
                /* webpackChunkName: "NewProspect" */ '../components/NewProspect/StressTestResult/NewProspectPdf.vue'
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
        path: 'export-report/:id',
        name: 'export-report',
        component: () =>
          import(/* webpackChunkName: "ExportReport" */ '../components/Documents/ClientReport/ExportClientReports.vue'),
        children: [
          {
            path: 'all',
            name: 'all-report',
            component: () =>
              import(/* webpackChunkName: "ExportReport" */ '../components/Documents/ClientReport/ClientReportAll.vue'),
          },
          {
            path: 'pdf',
            name: 'pdf-report',
            component: () =>
              import(/* webpackChunkName: "ExportReport" */ '../components/Documents/ClientReport/ClientReportPdf.vue'),
          },
          {
            path: 'excel',
            name: 'excel-report',
            component: () =>
              import(
                /* webpackChunkName: "ExportReport" */ '../components/Documents/ClientReport/ClientReportExcel.vue'
              ),
          },
        ],
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
        path: 'error',
        name: 'error',
        component: () => import(/* webpackChunkName: "Error" */ '../views/ErrorPage.vue'),
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
