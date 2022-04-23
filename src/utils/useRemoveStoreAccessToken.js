import { removeFromStorage } from '@/utils/utilsLocalStorage'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export function useRemoveStoreAccessToken() {
  const router = useRouter()
  const store = useStore()

  const removeAccessToken = () => {
    removeFromStorage(localStorage, 'access_token')
    removeFromStorage(localStorage, 'otp-type')
    removeFromStorage(localStorage, 'refresh_token_expired')
    removeFromStorage(localStorage, 'role')
    removeFromStorage(localStorage, 'currentCompany')
    store.commit('auth/setAuthUser', false)
    store.commit('auth/setRole', null)
    router.push({ path: '/login' })
  }

  return removeAccessToken
}
