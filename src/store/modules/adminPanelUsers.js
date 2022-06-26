const state = () => ({
  limit: 10,
  page: 1,
  filterRoleAdminPanel: null,
  filterCompanyAdminPanel: null,
  profileUserId: null,
  dialog: {
    showDialog: {
      modalAddNewUser: false,
      modalUserProfile: false,
    },
  },
})

const mutations = {
  setPage(state, value) {
    state.page = value
  },
  setFilterRoleAdminPanel(state, value) {
    state.filterRoleAdminPanel = value
  },

  setFilterCompanyAdminPanel(state, value) {
    state.filterCompanyAdminPanel = value
  },

  setProfileUserId(state, value) {
    state.profileUserId = value
  },

  setShowModal(state, data) {
    const { destination, value } = data
    state.dialog.showDialog[destination] = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
