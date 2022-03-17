const state = () => ({
  isAuth: false,
  sendFormForgotPass: false,
  otpType: '',
  role: '',
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
  setRole(state, value) {
    state.role = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
