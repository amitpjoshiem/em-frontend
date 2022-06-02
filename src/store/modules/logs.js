const state = () => ({
  limit: 10,
  page: 1,
  id: null,
})

const mutations = {
  setPage(state, value) {
    state.page = value
  },

  setId(state, value) {
    state.id = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
