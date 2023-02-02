import AdvisorHome from '@/layouts/AdvisorHome.vue'

const type = 'advisor'

export const advisorRoute = {
  path: '/advisor',
  name: 'advisor-home',
  component: AdvisorHome,
  meta: {
    resource: [
      { advisor: 'all' },
      { admin: 'all' },
      { ceo: 'all' },
      { assistant: 'all' },
      { client: 'all' },
      { support: 'all' },
    ],
    type,
  },
  children: [
    {
      path: 'dashboard',
      name: `${type}/dashboard`,
      component: () => import(/* webpackChunkName: "Dashboard" */ '../../views/AdvisorDashboard.vue'),
    },

    {
      path: 'document-export/:id',
      name: `${type}/document-export`,
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
      component: () => import(/* webpackChunkName: "ClientReport" */ '../../views/ClientReport.vue'),
      children: [
        {
          path: 'client-reports-list',
          name: `${type}/client-reports-list`,
          component: () =>
            import(/* webpackChunkName: "ClientReport" */ '../../components/ClientReport/ClientReportList.vue'),
        },
        {
          path: 'contract-info/:contract_id?',
          name: `${type}/contract-info`,
          component: () =>
            import(/* webpackChunkName: "ClientReport" */ '../../components/ClientReport/ContractDetails.vue'),
        },
      ],
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
      name: `${type}/leads`,
      component: () => import(/* webpackChunkName: "Leads" */ '../../views/Leads.vue'),
      children: [
        {
          path: 'all-leads',
          name: `${type}/all-leads`,
          component: () => import(/* webpackChunkName: "LisAllLeads" */ '../../components/ListLeads/ListAllLeads.vue'),
        },
        {
          path: 'active-leads',
          name: `${type}/active-leads`,
          component: () =>
            import(/* webpackChunkName: "ListActiveLeads" */ '../../components/ListLeads/ListActiveLeads.vue'),
        },
        {
          path: 'deactivated-leads',
          name: `${type}/deactivated-leads`,
          component: () =>
            import(
              /* webpackChunkName: "ListDeactivatedLeads" */ '../../components/ListLeads/ListDeactivatedLeads.vue'
            ),
        },
      ],
    },

    {
      path: 'pre-leads',
      name: `${type}/pre-leads`,
      component: () => import(/* webpackChunkName: "Pre-Leads" */ '../../views/PreLeads.vue'),
      children: [
        {
          path: 'all-pre-leads',
          name: `${type}/all-pre-leads`,
          component: () =>
            import(/* webpackChunkName: "ListAllPreLeads" */ '../../components/ListPreLeads/ListAllPreLeads.vue'),
        },
      ],
    },

    {
      path: 'member/:id',
      name: `${type}/member`,
      component: () => import(/* webpackChunkName: "MemberDetails" */ '../../views/MemberDetails.vue'),
      children: [
        {
          path: 'member-details',
          name: `${type}/member-details`,
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
      name: `${type}/asset-accounts`,
      component: () =>
        import(/* webpackChunkName: "AssetAccounts" */ '../../components/AssetAccounts/AssetAccounts.vue'),
    },

    {
      path: 'assets-consolidations/:id',
      name: `${type}/assets-consolidations`,
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
            import(/* webpackChunkName: "NewProspect" */ '../../components/NewProspect/AddProspectExpense.vue'),
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
      ],
    },

    {
      path: 'export-report/:id',
      name: `${type}/export-report`,
      component: () =>
        import(
          /* webpackChunkName: "ExportReport" */ '../../components/Documents/ClientReport/ExportClientReports.vue'
        ),
      children: [
        {
          path: 'all',
          name: `${type}/all-report`,
          component: () =>
            import(
              /* webpackChunkName: "ExportReport" */ '../../components/Documents/ClientReport/ClientReportAll.vue'
            ),
        },
        {
          path: 'pdf',
          name: `${type}/pdf-report`,
          component: () =>
            import(
              /* webpackChunkName: "ExportReport" */ '../../components/Documents/ClientReport/ClientReportPdf.vue'
            ),
        },
        {
          path: 'excel',
          name: `${type}/excel-report`,
          component: () =>
            import(
              /* webpackChunkName: "ExportReport" */ '../../components/Documents/ClientReport/ClientReportExcel.vue'
            ),
        },
      ],
    },

    {
      path: 'list-of-households',
      name: `${type}/list-of-households`,
      component: () => import(/* webpackChunkName: "ListOfHouseholds" */ '../../views/ListOfHouseholds.vue'),
      children: [
        {
          path: 'all',
          name: `${type}/all`,
          component: () =>
            import(/* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListAll.vue'),
        },
        {
          path: 'opportunities',
          name: `${type}/opportunities`,
          component: () =>
            import(
              /* webpackChunkName: "ListOfHouseholds" */ '../../components/ListOfHouseholds/ListOpportunities.vue'
            ),
        },
        {
          path: 'clients',
          name: `${type}/clients`,
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
