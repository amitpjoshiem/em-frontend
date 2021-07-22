const state = () => ({
  isEmptyDashboard: false,
  listType: 'all',
})

const mutations = {
  setEmptyDashboard(state, value) {
    state.isEmptyDashboard = value
  },

  setListType(state, value) {
    state.listType = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
