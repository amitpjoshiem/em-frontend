import AdminPanelHome from '@/layouts/AdminPanelHome.vue'

const type = 'admin'

export const apRouteAdmin = {
  path: '/admin-panel',
  name: 'ap-admin',
  component: AdminPanelHome,
  meta: {
    resource: [{ admin: 'all' }],
    type,
  },
  children: [
    {
      path: 'dashboard',
      name: `${type}/ap-dashboard`,
      component: () =>
        import(
          /* webpackChunkName: "AdminPanelDashboard" */ '../../components/AdminPanel/Dashboard/AdminPanelDashboard.vue'
        ),
    },
    {
      path: 'users',
      name: `${type}/ap-users`,
      component: () => import(/* webpackChunkName: "AdminPanelUsers" */ '../../components/AdminPanel/Users/Users.vue'),
    },
    {
      path: 'companies',
      name: `${type}/ap-companies`,
      component: () =>
        import(/* webpackChunkName: "AdminPanelCompanies" */ '../../components/AdminPanel/Companies/Companies.vue'),
    },
    {
      path: 'help',
      name: `${type}/ap-help`,
      component: () => import(/* webpackChunkName: "AdminPanelHelp" */ '../../components/AdminPanel/Help/Help.vue'),
    },
    {
      path: 'help-item/:id',
      name: `${type}/ap-help-item`,
      component: () =>
        import(/* webpackChunkName: "AdminPanelHelpItem" */ '../../components/AdminPanel/Help/HelpItem.vue'),
    },
  ],
}
