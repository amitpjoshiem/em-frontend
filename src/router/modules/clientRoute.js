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
      component: () =>
        import(/* webpackChunkName: "Clientreport" */ '../../components/ClientReport/ClientReportList.vue'),
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
      path: 'document-export/:id',
      name: `${type}/document-export`,
      component: () =>
        import(
          /* webpackChunkName: "DocumentExport" */ '../../components/AssetsConsolidations/Export/DocumentExport.vue'
        ),
    },
    {
      path: 'contract-info/:id',
      name: `${type}/contract-info`,
      component: () =>
        import(/* webpackChunkName: "ContractInfo" */ '../../components/ClientReport/ContractDetails.vue'),
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
  ],
}
