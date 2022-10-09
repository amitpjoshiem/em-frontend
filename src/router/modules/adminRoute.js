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
  ],
}
