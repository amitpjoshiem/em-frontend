import AdvisorHome from '@/layouts/AdvisorHome.vue'

const type = 'advisor'

export const advisorRoute = {
  path: '/advisor',
  name: 'advisor-home',
  component: AdvisorHome,
  meta: {
    resource: [{ advisor: 'all' }, { admin: 'all' }, { ceo: 'all' }, { assistant: 'all' }, { client: 'all' }],
    type,
  },
  children: [
    {
      path: 'advisor-dashboard',
      name: 'advisor-dashboard',
      component: () => import(/* webpackChunkName: "Dashboard" */ '../../views/AdvisorDashboard.vue'),
    },

    {
      path: 'document-export/:id',
      name: 'document-export',
      component: () =>
        import(
          /* webpackChunkName: "DocumentExport" */ '../../components/AssetsConsolidations/Export/DocumentExport.vue'
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

    {
      path: 'contract-info/:id',
      name: 'contract-info',
      component: () => import(/* webpackChunkName: "ContractInfo" */ '../../components/ClientReport/ContractInfo.vue'),
    },

    {
      path: 'activity',
      name: 'activity',
      component: () => import(/* webpackChunkName: "Activity" */ '../../views/Activity.vue'),
    },

    {
      path: 'pipeline',
      name: 'pipeline',
      component: () => import(/* webpackChunkName: "PipeLine" */ '../../views/PipeLine.vue'),
    },

    {
      path: 'logs',
      name: 'logs',
      component: () => import(/* webpackChunkName: "Logs" */ '../../views/Logs.vue'),
    },

    {
      path: 'error',
      name: 'error',
      component: () => import(/* webpackChunkName: "Error" */ '../../views/ErrorPage.vue'),
    },

    {
      path: 'leads',
      name: 'leads',
      component: () => import(/* webpackChunkName: "Leads" */ '../../views/Leads.vue'),
      children: [
        {
          path: 'list-all-leads',
          name: 'list-all-leads',
          component: () =>
            import(/* webpackChunkName: "ListOfLeads" */ '../../components/ListOfLeads/ListAllLeads.vue'),
        },
        {
          path: 'list-active-leads',
          name: 'list-active-leads',
          component: () =>
            import(/* webpackChunkName: "ListActiveLeads" */ '../../components/ListOfLeads/ListActiveLeads.vue'),
        },
        {
          path: 'list-deactivated-leads',
          name: 'list-deactivated-leads',
          component: () =>
            import(
              /* webpackChunkName: "ListDeactivatedLeads" */ '../../components/ListOfLeads/ListDeactivatedLeads.vue'
            ),
        },
      ],
    },

    {
      path: 'member/:id',
      name: 'member',
      component: () => import(/* webpackChunkName: "MemberDetails" */ '../../views/MemberDetails.vue'),
      children: [
        {
          path: 'member-details',
          name: 'member-details',
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
      path: 'past-stress-test/:id',
      name: `${type}/past-stress-test`,
      component: () =>
        import(
          /* webpackChunkName: "PastStressTestResults" */ '../../components/MemberDetails/PastStressTestResults.vue'
        ),
    },

    {
      path: 'asset-allocation-details/:id',
      name: 'asset-allocation-details',
      component: () =>
        import(/* webpackChunkName: "AssetAllocation" */ '../../components/AssetAllocation/AssetAllocationDetails.vue'),
    },

    {
      path: 'asset-accounts/:id',
      name: 'asset-accounts',
      component: () =>
        import(/* webpackChunkName: "AssetAccounts" */ '../../components/AssetAccounts/AssetAccounts.vue'),
    },

    {
      path: 'assets-consolidations/:id',
      name: 'assets-consolidations',
      component: () =>
        import(
          /* webpackChunkName: "AssetsConsolidations" */ '../../components/AssetsConsolidations/AssetsConsolidations.vue'
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
      path: 'asset-allocation-details/:id',
      name: 'asset-allocation-details',
      component: () =>
        import(
          /* webpackChunkName: "AssetAllocationDtails" */ '../../components/AssetAllocation/AssetAllocationDetails.vue'
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
      path: 'prospect-employment/:id',
      name: 'prospect-employment',
      component: () =>
        import(/* webpackChunkName: "ProspectEmployment" */ '../../components/EmploymentHistory/EmploymentHistory.vue'),
    },

    {
      path: 'add-opportunity/:id',
      name: 'add-opportunity',
      component: () => import(/* webpackChunkName: "Opportunity" */ '../../components/Opportunity/AddOpportunity.vue'),
    },

    {
      path: 'new-prospect',
      name: 'newprospect',
      component: () => import(/* webpackChunkName: "NewProspect" */ '../../views/NewProspect.vue'),
      children: [
        {
          path: 'basic/:id?',
          name: 'basic-information',
          component: () =>
            import(/* webpackChunkName: "NewProspect" */ '../../components/NewProspect/AddProspectBasicInfo.vue'),
        },
        {
          path: 'assets/:id?',
          name: 'assets-information',
          component: () =>
            import(/* webpackChunkName: "NewProspect" */ '../../components/NewProspect/AddProspectAssetsIncome.vue'),
        },
        {
          path: 'monthly-expense/:id?',
          name: 'monthly-expense',
          component: () =>
            import(
              /* webpackChunkName: "NewProspect" */ '../../components/NewProspect/AddMonthlyExpense/AddMonthlyExpense.vue'
            ),
        },
        {
          path: 'assets-account/:id?',
          name: 'assets-account',
          component: () =>
            import(/* webpackChunkName: "NewProspect" */ '../../components/NewProspect/NewProspectAssetsAccounts.vue'),
        },
        {
          path: 'add-assets-consolidations/:id?',
          name: 'add-assets-consolidations',
          component: () =>
            import(
              /* webpackChunkName: "NewProspect" */ '../../components/NewProspect/AddAssetsConsolidations/AddAssetsConsolidations.vue'
            ),
        },
        {
          path: 'stress-test/:id?',
          name: 'stresstest',
          component: () =>
            import(
              /* webpackChunkName: "NewProspect" */ '../../components/NewProspect/StressTestResult/NewProspectPdf.vue'
            ),
        },
        {
          path: '',
          redirect: () => {
            return { name: 'basic-information' }
          },
        },
      ],
    },

    {
      path: 'export-report/:id',
      name: 'export-report',
      component: () =>
        import(
          /* webpackChunkName: "ExportReport" */ '../../components/Documents/ClientReport/ExportClientReports.vue'
        ),
      children: [
        {
          path: 'all',
          name: 'all-report',
          component: () =>
            import(
              /* webpackChunkName: "ExportReport" */ '../../components/Documents/ClientReport/ClientReportAll.vue'
            ),
        },
        {
          path: 'pdf',
          name: 'pdf-report',
          component: () =>
            import(
              /* webpackChunkName: "ExportReport" */ '../../components/Documents/ClientReport/ClientReportPdf.vue'
            ),
        },
        {
          path: 'excel',
          name: 'excel-report',
          component: () =>
            import(
              /* webpackChunkName: "ExportReport" */ '../../components/Documents/ClientReport/ClientReportExcel.vue'
            ),
        },
      ],
    },

    {
      path: 'list-of-households',
      name: 'list-of-households',
      component: () => import(/* webpackChunkName: "ListOfHouseholds" */ '../../views/ListOfHouseholds.vue'),
      children: [
        {
          path: 'all',
          name: 'all',
          component: () =>
            import(/* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListAll.vue'),
        },
        {
          path: 'opportunities',
          name: 'opportunities',
          component: () =>
            import(
              /* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListOpportunities.vue'
            ),
        },
        {
          path: 'clients',
          name: 'clients',
          component: () =>
            import(/* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListClients.vue'),
        },
      ],
    },
    // {
    //   path: 'annuity-index/:id',
    //   name: 'annuity-index',
    //   component: () =>
    //     import(/* webpackChunkName: "AnnuityIndex" */ '../../components/AnnuityIndex/AnnuityIndexList.vue'),
    // },
    // {
    //   path: 'annuity-index-details/:id?',
    //   name: 'annuity-index-details',
    //   component: () =>
    //     import(/* webpackChunkName: "AnnuityIndexItem" */ '../../components/AnnuityIndex/AnnuityIndexDetails.vue'),
    // },
  ],
}
