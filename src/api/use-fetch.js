/* eslint-disable no-undef */
import { toRefs, reactive } from 'vue'
import { apiClient } from '@/api/api-client/ApiClient'

export const useFetch = (url, options) => {
  const state = reactive({
    response: [],
    headers: {},
    error: null,
    fetching: false,
  })
  const fetchData = async (params) => {
    state.fetching = true
    try {
      const body = JSON.stringify(params.body)
      const res = await apiClient.fetch(url, {
        ...options,
        ...params,
        body,
      })
      state.headers = Object.fromEntries(res.headers.entries())

      if (res.status === 204) {
        state.response.status = 204
        return
      }

      if (res.status === 202) {
        state.response.status = 202
        return
      }

      const json = await res.json()
      if (res.status === 200) {
        state.response = json
        return
      }

      state.error = json.message
    } catch (error) {
      state.error = error
    } finally {
      state.fetching = false
    }
  }
  return { ...toRefs(state), fetchData }
}
