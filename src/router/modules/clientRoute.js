import ClientHome from '@/layouts/ClientHome.vue'

const type = 'client'

export const clientRoute = {
  path: '/client',
  name: 'client-home',
  component: ClientHome,
  meta: {
    type,
  },
  children: [
    {
      path: 'details/:id',
      name: 'client-details',
      component: () =>
        import(/* webpackChunkName: "MemberDetails" */ '../../components/MemberDetails/MemberDetails.vue'),
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
  ],
}
