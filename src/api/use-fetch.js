/* eslint-disable no-undef */
import { toRefs, reactive } from 'vue'

import { useStore } from 'vuex'

const baseUrl = process.env.VUE_APP_API_URL

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

function readFromStorage(storage, key) {
  const item = storage.getItem(key)
  if (item) return JSON.parse(item)
  return null
}

export function saveToStorage(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

export const useFetch = (url, options) => {
  const state = reactive({
    response: [],
    error: null,
    fetching: false,
  })
  const fetchData = async (params) => {
    const store = useStore()
    state.fetching = true
    try {
      options = { ...options, ...config }
      const body = JSON.stringify(params.body)
      const token = readFromStorage(localStorage, 'access_token')
      if (token) options.headers['Authorization'] = `Bearer ${token}`
      const res = await fetch(baseUrl + url, { ...options, ...params, body })
      const json = await res.json()
      if (res.status === 403) {
        store.commit('auth/setAuthUser', false)
      }
      state.response = json
    } catch (errors) {
      state.error = errors
    } finally {
      state.fetching = false
    }
  }
  return { ...toRefs(state), fetchData }
}
