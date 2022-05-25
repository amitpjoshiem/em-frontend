const state = () => ({
  limit: 10,
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
