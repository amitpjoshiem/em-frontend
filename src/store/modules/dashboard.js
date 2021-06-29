// initial state
const state = () => ({
  // isEmptyDashboard: true,
  isEmptyDashboard: false,
})

// mutations
const mutations = {
  setEmptyDashboard(state, value) {
    state.isEmptyDashboard = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
