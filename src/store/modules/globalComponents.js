const state = () => ({
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
      dashboard: '6',
      listOfHouseholds: '6',
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
    },
  },
  dialog: {
    showDialog: {
      changeName: false,
      changePassword: false,
      shareFileEmailDialog: false,
      prewievPdf: false,
      moreOtherInfo: false,
      changePhone: false,
      exportSucces: false,
      modalContact: false,
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
  docIdShare: null,
  contact: null,
})

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

  setDocIdShare(state, value) {
    state.docIdShare = value
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
}

export default {
  namespaced: true,
  state,
  mutations,
}
