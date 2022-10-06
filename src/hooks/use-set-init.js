import { useFetchInit } from '@/api/use-fetch-init'
import { useSetUpdateAbility } from '@/hooks/use-set-update-ability'
import store from '@/store'
import { useRoutRedirect } from '@/hooks/use-rout-redirect'

export function useSetInit() {
  const { response, error, getInit } = useFetchInit()

  const { setUpdateAbility } = useSetUpdateAbility()
  const { routRedirect } = useRoutRedirect()

  const setInit = async () => {
    store.commit('globalComponents/setIsLoadingApp', true)
    await getInit()

    if (!error.value) {
      const typeUser = response.value.data.roles[0]
      const role = response.value.data.roles[0]
      const userId = response.value.data.user_id
      const termsAndConditions = typeUser === 'lead' ? response.value.data.terms_and_conditions : true
      const advisorId = response.value.data.advisor_id

      store.commit('globalComponents/setRole', role)
      store.commit('globalComponents/setCurrentTypeUser', typeUser)
      store.commit('globalComponents/setCurrentCompanyId', response.value.data.company_id)
      store.commit('globalComponents/setUserId', userId)

      if (typeUser === 'admin') store.commit('globalComponents/setAdminId', userId)
      if (typeUser === 'ceo') store.commit('globalComponents/setCeoId', userId)
      if (typeUser === 'advisor') store.commit('globalComponents/setAdvisorId', userId)
      if (typeUser === 'client') store.commit('globalComponents/setClientId', userId)
      if (typeUser === 'lead') store.commit('globalComponents/setLeadId', userId)
      if (typeUser === 'assistant') store.commit('globalComponents/setAdvisorId', advisorId)

      if (role === 'client' && !termsAndConditions) {
        store.commit('globalComponents/setTermsAndConditions', termsAndConditions)
      }

      await setUpdateAbility()

      routRedirect(role)

      setTimeout(function () {
        store.commit('globalComponents/setIsLoadingApp', false)
      }, 1000)
    }
  }
  return { setInit }
}
