/* eslint-disable no-undef */
import { toRefs, reactive } from 'vue'
import { readFromStorage } from '@/utils/utilsLocalStorage'

const baseUrl = process.env.VUE_APP_API_URL

const config = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}

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
      options = { ...options, ...config }
      const body = JSON.stringify(params.body)
      const token = readFromStorage(localStorage, 'access_token')
      if (token) options.headers['Authorization'] = `Bearer ${token}`
      const res = await fetch(baseUrl + url, { ...options, ...params, body })
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
