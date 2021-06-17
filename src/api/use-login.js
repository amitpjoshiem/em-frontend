import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { saveToStorage } from '@/utils/utilsLocalStorage'

const useLogin = () => {
  const router = useRouter()
  const store = useStore()

  const { response, error, fetching, fetchData } = useFetch('/login', {
    method: 'POST',
  })

  const storeAccessTokenAndRedirectToDashboard = () => {
    saveToStorage(localStorage, 'access_token', response.value.access_token)
    store.commit('auth/setAuthUser', true)
    router.push({ name: 'dashboard' })
  }

  const login = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
    storeAccessTokenAndRedirectToDashboard()
  }

  return {
    response,
    error,
    fetching,
    login,
  }
}

export { useLogin }
