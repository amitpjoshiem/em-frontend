const state = () => ({
  limit: 5,
  page: 1,
})

const mutations = {
  setPage(state, value) {
    state.page = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
