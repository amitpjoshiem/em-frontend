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
          name: 'client-basic-information',
          component: () =>
            import(
              /* webpackChunkName: "NewLeadBasicInformation" */ '../../components/Lead/AddLeadInformation/AddBasicInfo.vue'
            ),
        },
        {
          path: 'assets/:id?',
          name: 'client-assets-information',
          component: () =>
            import(
              /* webpackChunkName: "NewLeadAssetsInformation" */ '../../components/Lead/AddLeadInformation/AddAssets.vue'
            ),
        },
        {
          path: 'expense/:id?',
          name: 'client-expense-information',
          component: () =>
            import(
              /* webpackChunkName: "NewLeadExpenseInformation" */ '../../components/Lead/AddLeadInformation/AddExpense.vue'
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
