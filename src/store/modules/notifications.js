const state = () => ({
  notifications: [],
  showModal: false,
})

const mutations = {
  setNewNotifications(state, value) {
    state.notifications.push(value.value)
  },

  clearAllNoifications(state) {
    state.notifications = []
  },

  setShowModal(state, value) {
    state.showModal = value
  },
}

const actions = {
  newNotifications({ commit }, value) {
    commit('setNewNotifications', value)
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
