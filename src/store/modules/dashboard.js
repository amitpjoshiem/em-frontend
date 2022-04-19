const state = () => ({
  houseHolderType: 'client,prospect',
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
