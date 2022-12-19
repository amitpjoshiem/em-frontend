const getDefaultState = () => {
  return {
    companies: [],
    userId: null,
    currentCompanyId: '',
    ceoId: '',
    adminId: '',
    advisorId: '',
    clientId: '',
    leadId: '',
    supportId: '',
    currentTypeUser: '',
    role: '',
    isLoadingApp: false,
    termsAndConditions: null,
    showModalReadOnly: false,
    dateRangeClientReport: '',
    itemsPerPage: {
      options: [
        {
          title: '6',
          command: '6',
        },
        {
          title: '12',
          command: '12',
        },
        {
          title: '18',
          command: '18',
        },
      ],
      values: {
        default: '6',
        advisorDashboard: '6',
        listOfHouseholds: '6',
        superAdminDashboard: '6',
        superAdminListAdvisors: '6',
      },
    },
    selectFilter: {
      options: [
        {
          title: 'Past year',
          command: 'year',
        },
        {
          title: 'Past month',
          command: 'month',
        },
        {
          title: 'Past quarter',
          command: 'quarter',
        },
      ],
      values: {
        default: 'month',
        opportunitiesBlock: 'month',
        pipeLine: 'month',
        countLeeds: 'month',
        numberLeedsFilledData: 'month',
        numberLeedsConverted: 'month',
        numberLeedsClosed: 'month',
      },
    },
    dialog: {
      showDialog: {
        changeName: false,
        changePassword: false,
        shareFileEmailDialog: false,
        prewievPdf: false,
        moreOtherInfo: false,
        moreOwnerInfo: false,
        changePhone: false,
        exportSucces: false,
        modalContact: false,
        newLead: false,
        modalNewTable: false,
        modalSucces: false,
        modalTerms: false,
        modalAddAnnuityIndex: false,
        modalInvestmentPackage: false,
        addChildOpportunity: false,
        modalSummaryInfo: false,
        restoreDraft: false,
        newContract: false,
      },
    },
    sortMembers: {
      orderBy: 'created_at',
      sortedBy: 'descending',
    },
    memberId: null,
    pdfRegion: '',
    showDialogReloadPage: false,
    needUpdateContent: null,
    docShare: null,
    contact: null,
    previewUrl: null,
    opportunityId: null,
    onlyMyMember: false,
    ownerMember: null,
    onlyMyLead: false,
    ownerLead: null,
    onlyMyPreLead: false,
    ownerPreLead: null,
    summaryInfoMemberId: null,
  }
}

const state = getDefaultState()

const actions = {
  resetState({ commit }) {
    commit('resetState')
  },
}

const mutations = {
  setDestinationItemsPerPage(state, data) {
    const { destination, value } = data
    state.itemsPerPage.values[destination] = value
  },

  setDestinationSelectFilter(state, data) {
    const { destination, value } = data
    state.selectFilter.values[destination] = value
  },

  setShowModal(state, data) {
    const { destination, value } = data
    state.dialog.showDialog[destination] = value
  },

  setSortMembers(state, data) {
    const { orderBy, sortedBy } = data
    state.sortMembers.orderBy = orderBy
    state.sortMembers.sortedBy = sortedBy
  },

  setShowDialogRealodPage(state, value) {
    state.showDialogReloadPage = value
  },

  setPdfRegion(state, value) {
    state.pdfRegion = value
  },

  setDocShare(state, value) {
    state.docShare = value
  },

  setNeedUpdateContent(state, value) {
    state.needUpdateContent = value
  },

  setMemberId(state, value) {
    state.memberId = value
  },

  setContact(state, value) {
    state.contact = value
  },

  setCompanies(state, value) {
    state.companies = value
  },

  setCurrentCompanyId(state, value) {
    state.currentCompanyId = value
  },

  setAdminId(state, value) {
    state.adminId = value
  },

  setCeoId(state, value) {
    state.ceoId = value
  },

  setAdvisorId(state, value) {
    state.advisorId = value
  },

  setClientId(state, value) {
    state.clientId = value
  },

  setLeadId(state, value) {
    state.leadId = value
  },

  setSupportId(state, value) {
    state.supportId = value
  },

  setCurrentTypeUser(state, value) {
    state.currentTypeUser = value
  },

  setRole(state, value) {
    state.role = value
  },

  setUserId(state, value) {
    state.userId = value
  },

  setIsLoadingApp(state, value) {
    state.isLoadingApp = value
  },

  setTermsAndConditions(state, value) {
    state.termsAndConditions = value
  },

  setDateRangeClientReport(state, value) {
    state.dateRangeClientReport = value
  },

  setPreviewUrlPdf(state, value) {
    state.previewUrl = value
  },

  setOnlyMyMember(state, value) {
    state.onlyMyMember = value
  },

  setOwnerMember(state, value) {
    state.ownerMember = value
  },

  setOnlyMyLead(state, value) {
    state.onlyMyLead = value
  },

  setOwnerLead(state, value) {
    state.ownerLead = value
  },

  setOnlyMyPreLead(state, value) {
    state.onlyMyPreLead = value
  },

  setOwnerPreLead(state, value) {
    state.ownerPreLead = value
  },

  setOpportunityId(state, value) {
    state.opportunityId = value
  },

  setShowModalReadOnly(state, value) {
    state.showModalReadOnly = value
  },

  setSummaryInfoMemberId(state, value) {
    state.summaryInfoMemberId = value
  },

  resetState(state) {
    Object.assign(state, getDefaultState())
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
