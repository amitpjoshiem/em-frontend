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

    store.commit('auth/setAuthUser', false)

    store.commit('globalComponents/setRole', null)
    store.commit('globalComponents/setCurrentCompanyId', null)
    store.commit('globalComponents/setSuperAdminId', null)
    store.commit('globalComponents/setCeoId', null)
    store.commit('globalComponents/setAdvisorId', null)
    store.commit('globalComponents/setUserId', null)

    router.push({ path: '/login' })
  }

  return removeAccessToken
}
