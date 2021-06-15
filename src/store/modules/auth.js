// initial state
const state = () => ({
  isAuth: false,
  isShowOtpForm: false,
})

// getters
// const getters = {}

// mutations
const mutations = {
  setAuthUser(state, value) {
    state.isAuth = value
  },
}

// actions
// const actions = {}

export default {
  namespaced: true,
  state,
  // getters,
  // actions,
  mutations,
}
