const state = () => ({
  isAuth: false,
  isShowOtpForm: false,
  sendFormForgotPass: false,
})

const mutations = {
  setAuthUser(state, value) {
    state.isAuth = value
  },
  setFormForgotStatus(state, value) {
    state.sendFormForgotPass = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
