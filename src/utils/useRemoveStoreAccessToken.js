import { removeFromStorage } from '@/utils/utilsLocalStorage'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export function useRemoveStoreAccessToken() {
  const router = useRouter()
  const store = useStore()

  const removeAccessToken = async () => {
    removeFromStorage(localStorage, 'access_token')
    removeFromStorage(localStorage, 'otp-type')
    removeFromStorage(localStorage, 'refresh_token_expired')

    await store.dispatch('globalComponents/resetState')
    store.commit('auth/setAuthUser', false)

    // store.commit('globalComponents/setRole', null)
    // store.commit('globalComponents/setCurrentCompanyId', null)
    // store.commit('globalComponents/setAdminId', null)
    // store.commit('globalComponents/setCeoId', null)
    // store.commit('globalComponents/setAdvisorId', null)
    // store.commit('globalComponents/setUserId', null)
    // store.commit('globalComponents/setClientId', null)
    // store.commit('globalComponents/setLeadId', null)
    // store.commit('globalComponents/setTermsAndConditions', null)

    // store.commit('globalComponents/setShowModal', {
    //   destination: 'modalTerms',
    //   value: false,
    // })

    router.push({ path: '/login' })
  }

  return removeAccessToken
}
