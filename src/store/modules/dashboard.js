const state = () => ({
  isEmptyDashboard: false,
  houseHolderType: 'all',
})

const mutations = {
  setEmptyDashboard(state, value) {
    state.isEmptyDashboard = value
  },

  setHouseHolderType(state, value) {
    state.houseHolderType = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
