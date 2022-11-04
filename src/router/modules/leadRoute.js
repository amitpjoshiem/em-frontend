import LeadHome from '@/layouts/LeadHome.vue'

const type = 'lead'

export const leadRoute = {
  path: '/lead',
  name: 'lead-home',
  component: LeadHome,
  meta: {
    type,
  },
  children: [
    {
      path: 'dashboard',
      name: `${type}/dashboard`,
      component: () => import(/* webpackChunkName: "LeadDashboard" */ '../../views/LeadDashboard.vue'),
    },
    {
      path: 'completed-financial',
      name: 'completed-financial',
      component: () =>
        import(/* webpackChunkName: "CompletedFinancial" */ '../../components/Lead/CompletedFinancial.vue'),
      children: [
        {
          path: 'basic/:id?',
          name: 'lead-basic-information',
          component: () =>
            import(
              /* webpackChunkName: "AddLeadBasicInfo" */ '../../components/Lead/AddLeadInformation/AddLeadBasicInfo.vue'
            ),
        },
        {
          path: 'assets/:id?',
          name: 'lead-assets-information',
          component: () =>
            import(
              /* webpackChunkName: "AddLeadAssets" */ '../../components/Lead/AddLeadInformation/AddLeadAssets.vue'
            ),
        },
        {
          path: 'expense/:id?',
          name: 'lead-expense-information',
          component: () =>
            import(
              /* webpackChunkName: "AddLeadExpense" */ '../../components/Lead/AddLeadInformation/AddLeadExpense.vue'
            ),
        },
      ],
    },

    {
      path: 'confirmation-page/:id?',
      name: 'confirmation-page',
      component: () =>
        import(/* webpackChunkName: "ConfirmationPage" */ '../../components/Lead/Confirm/ConfirmationPage.vue'),
    },

    {
      path: 'relevant-financial-documents',
      name: 'relevant-financial-documents',
      component: () =>
        import(
          /* webpackChunkName: "RelevantFinancialDocuments" */ '../../components/Lead/RelevantFinancialDocuments.vue'
        ),
    },
    {
      path: 'medicare-details',
      name: 'medicare-details',
      props: { context: 'medicare_details' },
      component: () =>
        import(/* webpackChunkName: "MedicareDocuments" */ '../../components/Lead/MedicareDocuments.vue'),
    },
    {
      path: 'property-casualty',
      name: 'property-casualty',
      props: { context: 'property_casualty' },
      component: () => import(/* webpackChunkName: "PropertyCasualty" */ '../../components/Lead/PropertyCasualty.vue'),
    },
  ],
}
