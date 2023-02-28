import AdminPanelHome from '@/layouts/AdminPanelHome.vue'

const type = 'ceo'

export const apRouteCeo = {
  path: '/admin-panel',
  name: 'ap-ceo',
  component: AdminPanelHome,
  meta: {
    resource: [{ ceo: 'all' }],
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
