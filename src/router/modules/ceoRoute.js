import SuperAdminHome from '@/layouts/SuperAdminHome.vue'
import store from '@/store'
import { useRouter } from 'vue-router'

const router = useRouter()
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
      path: 'ceo-dashboard',
      name: 'ceo-dashboard',
      component: () => import(/* webpackChunkName: "SuperAdminDashboard" */ '../../views/SuperAdminDashboard.vue'),
    },
    {
      path: 'list-of-advisors',
      name: 'ceo-list-of-advisors',
      component: () => import(/* webpackChunkName: "ListOfAdvisors" */ '../../views/ListOfAdvisors.vue'),
      children: [
        {
          path: 'all-advisors',
          name: 'ceo-all-advisors',
          component: () =>
            import(
              /* webpackChunkName: "ListAdvisorsAll" */ '../../components/SuperAdmin/ListOfAdvisors/ListAdvisorsAll.vue'
            ),
        },
      ],
    },

    {
      path: 'list-of-households',
      name: 'ceo-list-of-households',
      component: () => import(/* webpackChunkName: "ListOfHouseholds" */ '../../views/ListOfHouseholds.vue'),
      children: [
        {
          path: 'all-list',
          name: 'ceo-all-list',
          component: () =>
            import(/* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListAll.vue'),
        },
        {
          path: 'opportunities-list',
          name: 'ceo-opportunities-list',
          component: () =>
            import(
              /* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListOpportunities.vue'
            ),
        },
        {
          path: 'clients-list',
          name: 'ceo-clients-list',
          component: () =>
            import(/* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListClients.vue'),
        },
      ],
    },

    {
      path: 'activity',
      name: 'ceo-activity',
      component: () => import(/* webpackChunkName: "Activity" */ '../../views/Activity.vue'),
    },

    {
      path: 'pipeline',
      name: 'ceo-pipeline',
      component: () => import(/* webpackChunkName: "PipeLine" */ '../../views/PipeLine.vue'),
    },
  ],
}
