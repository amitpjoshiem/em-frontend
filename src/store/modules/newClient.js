const state = () => ({
  step: 1,
})

const mutations = {
  setStep(state, value) {
    state.step = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
