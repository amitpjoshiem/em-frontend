import { computed } from 'vue'
import { useFetchInit } from '@/api/use-fetch-init'
import { useSetUpdateAbility } from '@/hooks/use-set-update-ability'
import store from '@/store'
import { useRoutRedirect } from '@/hooks/use-rout-redirect'

export function useSetInit() {
  const { response, error, getInit } = useFetchInit()

  const { setUpdateAbility } = useSetUpdateAbility()
  const { routRedirect } = useRoutRedirect()

  const getUserId = computed(() => {
    const role = response.value.data.roles[0]
    if (role === 'client' || role === 'lead') return response.value.data.member_id
    return response.value.data.user_id
  })

  const setInit = async () => {
    store.commit('globalComponents/setIsLoadingApp', true)
    await getInit()

    if (!error.value) {
      const typeUser = response.value.data.roles[0]
      const role = response.value.data.roles[0]
      const termsAndConditions = response.value.data.terms_and_conditions
      const advisorId = response.value.data.advisor_id

      store.commit('globalComponents/setRole', role)
      store.commit('globalComponents/setCurrentTypeUser', typeUser)
      store.commit('globalComponents/setCurrentCompanyId', response.value.data.company_id)
      store.commit('globalComponents/setUserId', getUserId)

      if (typeUser === 'admin') store.commit('globalComponents/setAdminId', getUserId)
      if (typeUser === 'ceo') store.commit('globalComponents/setCeoId', getUserId)
      if (typeUser === 'advisor') store.commit('globalComponents/setAdvisorId', getUserId)
      if (typeUser === 'client') store.commit('globalComponents/setClientId', getUserId)
      if (typeUser === 'lead') store.commit('globalComponents/setLeadId', getUserId)
      if (typeUser === 'assistant') store.commit('globalComponents/setAdvisorId', advisorId)

      if (role === 'client' || role === 'lead') {
        store.commit('globalComponents/setTermsAndConditions', termsAndConditions)
      }

      await setUpdateAbility()

      routRedirect({ role, userId: getUserId.value })

      setTimeout(function () {
        store.commit('globalComponents/setIsLoadingApp', false)
      }, 1000)
    }
  }
  return { setInit }
}
