const state = () => ({
  notifications: [],
})

const mutations = {
  setNewNotifications(state, value) {
    state.notifications.push(value.value)
  },

  clearAllNoifications(state) {
    state.notifications = []
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
