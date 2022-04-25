import { useFetchInit } from '@/api/use-fetch-init'
import { useSetUpdateAbility } from '@/hooks/use-set-update-ability'
import store from '@/store'

export function useSetInit() {
  const { response, error, getInit } = useFetchInit()

  const { setUpdateAbility } = useSetUpdateAbility()

  const setInit = async () => {
    await getInit()

    if (!error.value) {
      const typeUser = response.value.data.roles[0]
      const role = response.value.data.roles[0]
      const userId = response.value.data.user_id

      store.commit('globalComponents/setRole', role)
      store.commit('globalComponents/setCurrentTypeUser', typeUser)
      store.commit('globalComponents/setCurrentCompanyId', response.value.data.company_id)

      if (typeUser === 'superadmin') store.commit('globalComponents/setSuperAdminId', userId)
      if (typeUser === 'ceo') store.commit('globalComponents/setCeoId', userId)
      if (typeUser === 'advisor') store.commit('globalComponents/setAdvisorId', userId)

      setUpdateAbility()
    }
  }
  return { setInit }
}
