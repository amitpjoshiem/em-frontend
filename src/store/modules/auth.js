const state = () => ({
  isAuth: false,
  isShowOtpForm: false,
  sendFormForgotPass: false,
  otpType: '',
})

const mutations = {
  setAuthUser(state, value) {
    state.isAuth = value
  },

  setFormForgotStatus(state, value) {
    state.sendFormForgotPass = value
  },

  setOtpType(state, value) {
    state.otpType = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
