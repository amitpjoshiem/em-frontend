const state = () => ({
  isEmptyDashboard: false,
})

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
