const state = () => ({
  prospectBasicDraft: null,
})

const mutations = {
  setProspectBasicDraft(state, value) {
    state.prospectBasicDraft = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
