import SuperAdminHome from '@/layouts/SuperAdminHome.vue'

const type = 'admin'

export const adminRoute = {
  path: '/admin',
  name: 'admin',
  component: SuperAdminHome,
  meta: {
    resource: [{ admin: 'all' }],
    type,
  },
  children: [
    {
      path: 'dashboard',
      name: 'admin-dashboard',
      component: () => import(/* webpackChunkName: "SuperAdminDashboard" */ '../../views/SuperAdminDashboard.vue'),
    },
    {
      path: 'list-of-advisors',
      name: 'admin-list-of-advisors',
      component: () => import(/* webpackChunkName: "ListOfAdvisors" */ '../../views/ListOfAdvisors.vue'),
      children: [
        {
          path: 'all-advisors',
          name: 'admin-all-advisors',
          component: () =>
            import(
              /* webpackChunkName: "ListAdvisorsAll" */ '../../components/SuperAdmin/ListOfAdvisors/ListAdvisorsAll.vue'
            ),
        },
      ],
    },

    {
      path: 'list-of-households',
      name: 'admin-list-of-households',
      component: () => import(/* webpackChunkName: "ListOfHouseholds" */ '../../views/ListOfHouseholds.vue'),
      children: [
        {
          path: 'all-list',
          name: 'admin-all-list',
          component: () =>
            import(/* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListAll.vue'),
        },
        {
          path: 'opportunities-list',
          name: 'admin-opportunities-list',
          component: () =>
            import(
              /* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListOpportunities.vue'
            ),
        },
        {
          path: 'clients-list',
          name: 'admin-clients-list',
          component: () =>
            import(/* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListClients.vue'),
        },
      ],
    },

    {
      path: 'activity',
      name: 'admin-activity',
      component: () => import(/* webpackChunkName: "Activity" */ '../../views/Activity.vue'),
    },

    {
      path: 'pipeline',
      name: 'admin-pipeline',
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
      component: () => import(/* webpackChunkName: "Clientreport" */ '../../components/ClientReport/ClientReport.vue'),
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
  ],
}
