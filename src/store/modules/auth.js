// initial state
const state = () => ({
  isAuth: false,
  isShowOtpForm: false,
  sendFormForgotPass: false,
})

// getters
// const getters = {}

// mutations
const mutations = {
  setAuthUser(state, value) {
    state.isAuth = value
  },
  setFormForgotStatus(state, value) {
    state.sendFormForgotPass = value
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
