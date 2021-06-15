/* eslint-disable no-undef */
import { toRefs, reactive } from 'vue'

const baseUrl = process.env.VUE_APP_API_URL

export const useFetch = (url, options) => {
  const state = reactive({
    response: [],
    error: null,
    fetching: false,
  })
  const fetchData = async (params) => {
    state.fetching = true
    try {
      const res = await fetch(baseUrl + url, { ...options, ...params })
      const json = await res.json()
      state.response = json
    } catch (errors) {
      state.error = errors
    } finally {
      state.fetching = false
    }
  }
  return { ...toRefs(state), fetchData }
}
