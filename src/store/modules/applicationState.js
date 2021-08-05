const state = () => ({
  hideModal: false,
})

const mutations = {
  setHideModal(state, value) {
    state.hideModal = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
