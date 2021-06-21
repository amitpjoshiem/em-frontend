import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { removeToStorage } from '@/utils/utilsLocalStorage'

const useLogout = () => {
  const router = useRouter()
  const store = useStore()

  const { response, error, fetching, fetchData } = useFetch('/logout', {
    method: 'DELETE',
  })

  const removeStoreAccessTokenAndRedirect = () => {
    removeToStorage(localStorage, 'access_token', response.value.access_token)
    store.commit('auth/setAuthUser', false)
    router.push({ name: 'home' })
  }

  const logout = async (body) => {
    await fetchData({ body })
    console.log(error.value)
    if (error.value !== null) return
    removeStoreAccessTokenAndRedirect()
  }

  return {
    response,
    error,
    fetching,
    logout,
  }
}

export { useLogout }
