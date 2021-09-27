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
  dialog: {
    showDialog: {
      changeName: false,
      changePassword: false,
      shareFileEmailDialog: false,
    },
  },
  sortMembers: {
    orderBy: 'created_at',
    sortedBy: 'descending',
  },
})

const mutations = {
  setDestinationItemsPerPage(state, data) {
    const { destination, value } = data
    state.itemsPerPage.values[destination] = value
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
}

export default {
  namespaced: true,
  state,
  mutations,
}
