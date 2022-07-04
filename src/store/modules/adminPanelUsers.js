const state = () => ({
  limit: 10,
  page: 1,
  filterRoleAdminPanel: null,
  filterCompanyAdminPanel: null,
  filterUserAdminPanel: null,
  filterStatusAdminPanel: 'with',
  profileUserId: null,
  editUser: null,
  currentCompanyId: null,
  editCompany: null,
  deleteUser: null,
  dialog: {
    showDialog: {
      modalAddNewUser: false,
      modalUserProfile: false,
      modalCompany: false,
      modalDeleteUser: false,
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

  setFilterUserAdminPanel(state, value) {
    state.filterUserAdminPanel = value
  },

  setEditUser(state, value) {
    state.editUser = value
  },

  setEditCompany(state, value) {
    state.editCompany = value
  },

  setProfileUserId(state, value) {
    state.profileUserId = value
  },

  setCurrentCompanyId(state, value) {
    state.currentCompanyId = value
  },

  setDeleteUser(state, value) {
    state.deleteUser = value
  },

  setFilterStatusAdminPanel(state, value) {
    state.filterStatusAdminPanel = value
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
