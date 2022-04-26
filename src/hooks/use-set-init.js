import { useFetchInit } from '@/api/use-fetch-init'
import { useSetUpdateAbility } from '@/hooks/use-set-update-ability'
import store from '@/store'
import { useRouter } from 'vue-router'

export function useSetInit() {
  const { response, error, getInit } = useFetchInit()

  const { setUpdateAbility } = useSetUpdateAbility()

  const router = useRouter()

  const setInit = async () => {
    store.commit('globalComponents/setIsLoadingApp', true)
    await getInit()

    if (!error.value) {
      const typeUser = response.value.data.roles[0]
      const role = response.value.data.roles[0]
      const userId = response.value.data.user_id

      store.commit('globalComponents/setRole', role)
      store.commit('globalComponents/setCurrentTypeUser', typeUser)
      store.commit('globalComponents/setCurrentCompanyId', response.value.data.company_id)
      store.commit('globalComponents/setUserId', userId)

      if (typeUser === 'superadmin') store.commit('globalComponents/setSuperAdminId', userId)
      if (typeUser === 'ceo') store.commit('globalComponents/setCeoId', userId)
      if (typeUser === 'advisor') store.commit('globalComponents/setAdvisorId', userId)

      await setUpdateAbility()

      router.push({ path: '/' })

      setTimeout(function () {
        store.commit('globalComponents/setIsLoadingApp', false)
      }, 1000)
    }
  }
  return { setInit }
}
