import AdminPanelHome from '@/layouts/AdminPanelHome.vue'

export const adminPanelRoute = {
  path: '/admin-panel',
  name: 'admin-panel',
  component: AdminPanelHome,
  meta: {
    resource: [{ admin: 'all' }, { ceo: 'all' }],
    type: 'advisor',
  },
  children: [
    {
      path: 'dashboard',
      name: 'ap-dashboard',
      component: () =>
        import(
          /* webpackChunkName: "AdminPanelDashboard" */ '../../components/AdminPanel/Dashboard/AdminPanelDashboard.vue'
        ),
    },
    {
      path: 'users',
      name: 'ap-users',
      component: () => import(/* webpackChunkName: "AdminPanelUsers" */ '../../components/AdminPanel/Users/Users.vue'),
    },
    {
      path: 'companies',
      name: 'ap-companies',
      component: () =>
        import(/* webpackChunkName: "AdminPanelCompanies" */ '../../components/AdminPanel/Companies/Companies.vue'),
    },
  ],
}
