const state = () => ({
  prospectBasicDraft: null,
  leadBasicDraft: null,
})

const mutations = {
  setProspectBasicDraft(state, value) {
    state.prospectBasicDraft = value
  },
  setLeadBasicDraft(state, value) {
    state.leadBasicDraft = value
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
