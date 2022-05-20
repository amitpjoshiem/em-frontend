import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import AdvisorHome from '@/layouts/AdvisorHome.vue'
import ClientHome from '@/layouts/ClientHome.vue'
import SuperAdminHome from '@/layouts/SuperAdminHome.vue'
import Settings from '@/layouts/Settings.vue'
import Login from '@/layouts/Login.vue'
import Home from '@/layouts/Home.vue'
import ability from '../services/ability'

import { useSetInit } from '@/hooks/use-set-init'
import { useSetUpdateAbility } from '@/hooks/use-set-update-ability'

const routes = [
  {
    path: '/client',
    name: 'client-home',
    component: ClientHome,
    meta: {
      type: 'client',
    },
    children: [
      {
        path: 'client-dashboard',
        name: 'client-dashboard',
        component: () => import(/* webpackChunkName: "ClientDashboard" */ '../views/ClientDashboard.vue'),
      },
      {
        path: 'completed-financial',
        name: 'completed-financial',
        component: () =>
          import(/* webpackChunkName: "CompletedFinancial" */ '../components/Client/CompletedFinancial.vue'),
        children: [
          {
            path: 'basic/:id?',
            name: 'client-basic-information',
            component: () =>
              import(
                /* webpackChunkName: "NewClientBasicInformation" */ '../components/Client/AddNewClient/AddBasicInfo.vue'
              ),
          },
          {
            path: 'assets/:id?',
            name: 'client-assets-information',
            component: () =>
              import(
                /* webpackChunkName: "NewClientAssetsInformation" */ '../components/Client/AddNewClient/Assets/AddAssets.vue'
              ),
          },
          {
            path: 'expense/:id?',
            name: 'client-expense-information',
            component: () =>
              import(
                /* webpackChunkName: "NewClienExpenseInformation" */ '../components/Client/AddNewClient/AddExpense.vue'
              ),
          },
        ],
      },

      {
        path: 'confirmation-page/:id?',
        name: 'confirmation-page',
        component: () =>
          import(/* webpackChunkName: "ConfirmationPage" */ '../components/Client/Confirm/ConfirmationPage.vue'),
      },

      {
        path: 'investment-retirement',
        name: 'investment-retirement',
        props: { context: 'investment_and_retirement_accounts' },
        component: () =>
          import(/* webpackChunkName: "DocumentsClients" */ '../components/Client/Upload/DocumentsClients.vue'),
      },
      {
        path: 'life-insurance',
        name: 'life-insurance',
        props: { context: 'life_insurance_annuity_and_long_terms_care_policies' },
        component: () =>
          import(/* webpackChunkName: "DocumentsClients" */ '../components/Client/Upload/DocumentsClients.vue'),
      },
      {
        path: 'social-security',
        name: 'social-security',
        props: { context: 'social_security_information' },
        component: () =>
          import(/* webpackChunkName: "DocumentsClients" */ '../components/Client/Upload/DocumentsClients.vue'),
      },
      {
        path: 'list-stock',
        name: 'list-stock',
        props: { context: 'list_of_stock_certificates_or_bonds' },
        component: () =>
          import(/* webpackChunkName: "DocumentsClients" */ '../components/Client/Upload/DocumentsClients.vue'),
      },
    ],
  },

  // ADMIN
  {
    path: '/admin',
    name: 'admin',
    component: SuperAdminHome,
    meta: {
      resource: [{ admin: 'all' }],
      type: 'admin',
    },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import(/* webpackChunkName: "SuperAdminDashboard" */ '../views/SuperAdminDashboard.vue'),
      },
      {
        path: 'list-of-advisors',
        name: 'admin-list-of-advisors',
        component: () => import(/* webpackChunkName: "ListOfAdvisors" */ '../views/ListOfAdvisors.vue'),
        children: [
          {
            path: 'all-advisors',
            name: 'admin-all-advisors',
            component: () =>
              import(
                /* webpackChunkName: "ListAdvisorsAll" */ '../components/SuperAdmin/ListOfAdvisors/ListAdvisorsAll.vue'
              ),
          },
        ],
      },

      {
        path: 'list-of-households',
        name: 'admin-list-of-households',
        component: () => import(/* webpackChunkName: "ListOfHouseholds" */ '../views/ListOfHouseholds.vue'),
        children: [
          {
            path: 'all-list',
            name: 'admin-all-list',
            component: () =>
              import(/* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListAll.vue'),
          },
          {
            path: 'opportunities-list',
            name: 'admin-opportunities-list',
            component: () =>
              import(/* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListOpportunities.vue'),
          },
          {
            path: 'clients-list',
            name: 'admin-clients-list',
            component: () =>
              import(/* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListClients.vue'),
          },
        ],
      },

      {
        path: 'activity',
        name: 'admin-activity',
        component: () => import(/* webpackChunkName: "Activity" */ '../views/Activity.vue'),
      },

      {
        path: 'pipeline',
        name: 'admin-pipeline',
        component: () => import(/* webpackChunkName: "PipeLine" */ '../views/PipeLine.vue'),
      },
    ],
  },

  // CEO
  {
    path: '/ceo',
    name: 'ceo',
    component: SuperAdminHome,
    beforeEnter: (to) => {
      if (to && to.query.id) {
        store.commit('globalComponents/setCurrentCompanyId', to.query.id)
        let query = Object.assign({}, to)
        delete query.id
        router.replace()
      }
      return true
    },
    meta: {
      resource: [{ ceo: 'all' }],
      type: 'ceo',
    },
    children: [
      {
        path: 'ceo-dashboard',
        name: 'ceo-dashboard',
        component: () => import(/* webpackChunkName: "SuperAdminDashboard" */ '../views/SuperAdminDashboard.vue'),
      },
      {
        path: 'list-of-advisors',
        name: 'ceo-list-of-advisors',
        component: () => import(/* webpackChunkName: "ListOfAdvisors" */ '../views/ListOfAdvisors.vue'),
        children: [
          {
            path: 'all-advisors',
            name: 'ceo-all-advisors',
            component: () =>
              import(
                /* webpackChunkName: "ListAdvisorsAll" */ '../components/SuperAdmin/ListOfAdvisors/ListAdvisorsAll.vue'
              ),
          },
        ],
      },

      {
        path: 'list-of-households',
        name: 'ceo-list-of-households',
        component: () => import(/* webpackChunkName: "ListOfHouseholds" */ '../views/ListOfHouseholds.vue'),
        children: [
          {
            path: 'all-list',
            name: 'ceo-all-list',
            component: () =>
              import(/* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListAll.vue'),
          },
          {
            path: 'opportunities-list',
            name: 'ceo-opportunities-list',
            component: () =>
              import(/* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListOpportunities.vue'),
          },
          {
            path: 'clients-list',
            name: 'ceo-clients-list',
            component: () =>
              import(/* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListClients.vue'),
          },
        ],
      },

      {
        path: 'activity',
        name: 'ceo-activity',
        component: () => import(/* webpackChunkName: "Activity" */ '../views/Activity.vue'),
      },

      {
        path: 'pipeline',
        name: 'ceo-pipeline',
        component: () => import(/* webpackChunkName: "PipeLine" */ '../views/PipeLine.vue'),
      },
    ],
  },

  // ADVISOR
  {
    path: '/advisor',
    name: 'advisor-home',
    component: AdvisorHome,
    meta: {
      resource: [{ advisor: 'all' }, { admin: 'all' }, { ceo: 'all' }, { assistant: 'all' }],
      type: 'advisor',
    },
    children: [
      {
        path: 'advisor-dashboard',
        name: 'advisor-dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/AdvisorDashboard.vue'),
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
        component: () => import(/* webpackChunkName: "Clientreport" */ '../components/ClientReport/ClientReport.vue'),
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
        path: 'error',
        name: 'error',
        component: () => import(/* webpackChunkName: "Error" */ '../views/ErrorPage.vue'),
      },

      {
        path: 'leads',
        name: 'leads',
        component: () => import(/* webpackChunkName: "Leads" */ '../views/Leads.vue'),
        children: [
          {
            path: 'list-all-leads',
            name: 'list-all-leads',
            component: () => import(/* webpackChunkName: "ListOfLeads" */ '../components/ListOfLeads/ListAllLeads.vue'),
          },
          {
            path: 'list-active-leads',
            name: 'list-active-leads',
            component: () =>
              import(/* webpackChunkName: "ListActiveLeads" */ '../components/ListOfLeads/ListActiveLeads.vue'),
          },
          {
            path: 'list-deactivated-leads',
            name: 'list-deactivated-leads',
            component: () =>
              import(
                /* webpackChunkName: "ListDeactivatedLeads" */ '../components/ListOfLeads/ListDeactivatedLeads.vue'
              ),
          },
        ],
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
            path: 'opportunities',
            name: 'opportunities',
            component: () =>
              import(/* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListOpportunities.vue'),
          },
          {
            path: 'clients',
            name: 'clients',
            component: () =>
              import(/* webpackChunkName: "ListOfHouseholds" */ '../components/ListOfHouseholds/ListClients.vue'),
          },
        ],
      },
    ],
  },

  {
    path: '/settings-app',
    name: 'settings-app',
    component: Settings,
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "Settings" */ '../components/Settings/ProfileSettings.vue'),
      },
      {
        path: 'information',
        name: 'information',
        meta: {},
        component: () => import(/* webpackChunkName: "Settings" */ '../components/Settings/InformationSettings.vue'),
      },
      {
        path: 'partners',
        name: 'partners',
        meta: {},
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
    path: '/',
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
    await setInit()
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
