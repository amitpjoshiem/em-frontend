const state = () => ({
  houseHolderType: 'all',
})

const mutations = {
  setHouseHolderType(state, value) {
    state.houseHolderType = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
