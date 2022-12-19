import SuperAdminHome from '@/layouts/SuperAdminHome.vue'
import store from '@/store'
import router from '../index'

const type = 'ceo'

export const ceoRoute = {
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
    type,
  },
  children: [
    {
      path: 'dashboard',
      name: `${type}/dashboard`,
      component: () => import(/* webpackChunkName: "SuperAdminDashboard" */ '../../views/SuperAdminDashboard.vue'),
    },
    {
      path: 'list-of-advisors',
      name: `${type}/list-of-advisors`,
      component: () => import(/* webpackChunkName: "ListOfAdvisors" */ '../../views/ListOfAdvisors.vue'),
      children: [
        {
          path: 'all',
          name: `${type}/all-advisors`,
          component: () =>
            import(
              /* webpackChunkName: "ListAdvisorsAll" */ '../../components/SuperAdmin/ListOfAdvisors/ListAdvisorsAll.vue'
            ),
        },
      ],
    },
    {
      path: 'list-of-households',
      name: `${type}/list-of-households`,
      component: () => import(/* webpackChunkName: "ListOfHouseholds" */ '../../views/ListOfHouseholds.vue'),
      children: [
        {
          path: 'all',
          name: `${type}/all`,
          component: () =>
            import(/* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListAll.vue'),
        },
        {
          path: 'opportunities',
          name: `${type}/opportunities`,
          component: () =>
            import(
              /* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListOpportunities.vue'
            ),
        },
        {
          path: 'clients',
          name: `${type}/clients`,
          component: () =>
            import(/* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListClients.vue'),
        },
      ],
    },
    {
      path: 'leads',
      name: `${type}/leads`,
      component: () => import(/* webpackChunkName: "Leads" */ '../../views/Leads.vue'),
      children: [
        {
          path: 'all-leads',
          name: `${type}/all-leads`,
          component: () => import(/* webpackChunkName: "ListLeads" */ '../../components/ListLeads/ListAllLeads.vue'),
        },
        {
          path: 'active-leads',
          name: `${type}/active-leads`,
          component: () =>
            import(/* webpackChunkName: "ListActiveLeads" */ '../../components/ListLeads/ListActiveLeads.vue'),
        },
        {
          path: 'deactivated-leads',
          name: `${type}/deactivated-leads`,
          component: () =>
            import(
              /* webpackChunkName: "ListDeactivatedLeads" */ '../../components/ListLeads/ListDeactivatedLeads.vue'
            ),
        },
      ],
    },
    {
      path: 'activity',
      name: `${type}/activity`,
      component: () => import(/* webpackChunkName: "Activity" */ '../../views/Activity.vue'),
    },
    {
      path: 'pipeline',
      name: `${type}/pipeline`,
      component: () => import(/* webpackChunkName: "PipeLine" */ '../../views/PipeLine.vue'),
    },
    {
      path: 'member/:id',
      name: `${type}/member`,
      component: () => import(/* webpackChunkName: "MemberDetails" */ '../../views/MemberDetails.vue'),
      children: [
        {
          path: 'member-details',
          name: `${type}/member-details`,
          component: () =>
            import(/* webpackChunkName: "MemberDetails" */ '../../components/MemberDetails/MemberDetails.vue'),
        },
        {
          path: 'annuity-index/:annuityId',
          name: `${type}/annuity-index`,
          component: () =>
            import(/* webpackChunkName: "AnnuityIndex" */ '../../components/AnnuityIndex/AnnuityIndexList.vue'),
        },

        {
          path: 'annuity-index-details/:annuityId?',
          name: `${type}/annuity-index-details`,
          component: () =>
            import(/* webpackChunkName: "AnnuityIndexItem" */ '../../components/AnnuityIndex/AnnuityIndexDetails.vue'),
        },
      ],
    },
    {
      path: 'blueprint-report/:id',
      name: `${type}/blueprint-report`,
      component: () => import(/* webpackChunkName: "BlueprintReport" */ '../../components/Report/BlueprintReport.vue'),
    },
    {
      path: 'client-report/:id',
      name: `${type}/clientreport`,
      component: () =>
        import(/* webpackChunkName: "Clientreport" */ '../../components/ClientReport/ClientReportList.vue'),
    },
    {
      path: 'past-stress-test/:id',
      name: `${type}/past-stress-test`,
      component: () =>
        import(
          /* webpackChunkName: "PastStressTestResults" */ '../../components/MemberDetails/PastStressTestResults.vue'
        ),
    },
    {
      path: 'opportunity-contact/:id',
      name: `${type}/opportunity-contact`,
      component: () =>
        import(
          /* webpackChunkName: "OpportunityContact" */ '../../components/OpportunityContact/OpportunityContact.vue'
        ),
    },
    {
      path: 'basic-information/:id',
      name: `${type}/basic-information`,
      component: () =>
        import(
          /* webpackChunkName: "MemberDetails" */ '../../components/MemberBasicInformation/MemberBasicInformation.vue'
        ),
    },
    {
      path: 'asset-accounts/:id',
      name: `${type}/asset-accounts`,
      component: () =>
        import(/* webpackChunkName: "AssetAccounts" */ '../../components/AssetAccounts/AssetAccounts.vue'),
    },

    {
      path: 'assets-consolidations/:id',
      name: `${type}/assets-consolidations`,
      component: () =>
        import(
          /* webpackChunkName: "AssetsConsolidations" */ '../../components/AssetsConsolidations/AssetsConsolidations.vue'
        ),
    },
  ],
}
