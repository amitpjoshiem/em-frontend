import AdminPanelHome from '@/layouts/AdminPanelHome.vue'

const type = 'ceo'

export const apRouteCeo = {
  path: '/admin-panel',
  name: 'admin-panel',
  component: AdminPanelHome,
  meta: {
    resource: [{ admin: 'all' }, { ceo: 'all' }],
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
  ],
}
