import { computed } from 'vue'
import { useFetchInit } from '@/api/use-fetch-init'
import { useSetUpdateAbility } from '@/hooks/use-set-update-ability'
import { useRoutRedirect } from '@/hooks/use-rout-redirect'
import store from '@/store'

import router from '../router/index'

export function useSetInit() {
  const { response, error, getInit } = useFetchInit()

  const { setUpdateAbility } = useSetUpdateAbility()
  const { routRedirect } = useRoutRedirect()

  const getUserId = computed(() => {
    if (response.value.data.roles[0] === 'client') return response.value.data.member_id
    return response.value.data.user_id
  })

  const setInit = async (to = {}) => {
    store.commit('globalComponents/setIsLoadingApp', true)
    await getInit()

    if (!error.value) {
      const typeUser = response.value.data.roles[0]
      const role = response.value.data.roles[0]
      const termsAndConditions = response.value.data.terms_and_conditions
      const advisorId = response.value.data.advisor_id
      const readOnly = response.value.data.readonly

      store.commit('globalComponents/setRole', role)
      store.commit('globalComponents/setCurrentTypeUser', typeUser)
      store.commit('globalComponents/setCurrentCompanyId', response.value.data.company_id)
      store.commit('globalComponents/setUserId', response.value.data.user_id)

      if (typeUser === 'admin') store.commit('globalComponents/setAdminId', getUserId.value)
      if (typeUser === 'ceo') store.commit('globalComponents/setCeoId', getUserId.value)
      if (typeUser === 'advisor') store.commit('globalComponents/setAdvisorId', getUserId.value)
      if (typeUser === 'client') store.commit('globalComponents/setClientId', getUserId.value)
      if (typeUser === 'lead') store.commit('globalComponents/setLeadId', getUserId.value)
      if (typeUser === 'lead') store.commit('globalComponents/setMemberId', response.value.data.member_id)
      if (typeUser === 'assistant') store.commit('globalComponents/setAdvisorId', advisorId)
      if (typeUser === 'support') store.commit('globalComponents/setSupportId', getUserId.value)

      if ((role === 'client' || role === 'lead') && !termsAndConditions) {
        store.commit('globalComponents/setTermsAndConditions', termsAndConditions)
        router.push({ name: 'terms' })
        return
      }

      if (role === 'lead' && readOnly) {
        store.commit('globalComponents/setShowModalReadOnly', readOnly)
      }

      await setUpdateAbility()

      if (to && to.name !== 'telegram-login') {
        routRedirect({ role, userId: getUserId.value })
      }

      setTimeout(function () {
        store.commit('globalComponents/setIsLoadingApp', false)
      }, 1000)
    }
  }
  return { setInit }
}
