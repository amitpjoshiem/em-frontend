import SupportHome from '@/layouts/SupportHome.vue'

const type = 'support'

export const supportRoute = {
  path: '/support',
  name: 'support-home',
  component: SupportHome,
  meta: {
    type,
  },
  children: [
    {
      path: 'dashboard',
      name: `${type}/dashboard`,
      component: () => import(/* webpackChunkName: "SupportDashboard" */ '../../views/SupportDashboard.vue'),
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
          component: () =>
            import(/* webpackChunkName: "ListOfLeads" */ '../../components/ListOfLeads/ListAllLeads.vue'),
        },
        {
          path: 'active-leads',
          name: `${type}/active-leads`,
          component: () =>
            import(/* webpackChunkName: "ListActiveLeads" */ '../../components/ListOfLeads/ListActiveLeads.vue'),
        },
        {
          path: 'deactivated-leads',
          name: `${type}/deactivated-leads`,
          component: () =>
            import(
              /* webpackChunkName: "ListDeactivatedLeads" */ '../../components/ListOfLeads/ListDeactivatedLeads.vue'
            ),
        },
      ],
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
      path: 'blueprint-report/:id',
      name: `${type}/blueprint-report`,
      component: () => import(/* webpackChunkName: "BlueprintReport" */ '../../components/Report/BlueprintReport.vue'),
    },

    {
      path: 'client-report/:id',
      name: `${type}/clientreport`,
      component: () => import(/* webpackChunkName: "Clientreport" */ '../../components/ClientReport/ClientReport.vue'),
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
