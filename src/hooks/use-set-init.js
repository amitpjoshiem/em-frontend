import { useFetchInit } from '@/api/use-fetch-init'
import { useSetUpdateAbility } from '@/hooks/use-set-update-ability.js'
import store from '@/store'

export function useSetInit() {
  const { response, error, getInit } = useFetchInit()

  const { setUpdateAbility } = useSetUpdateAbility()

  const setInit = async () => {
    await getInit()

    if (!error.value) {
      store.commit('auth/setRole', response.value.data.roles[0])
      store.commit('globalComponents/setTypeUser', response.value.data.roles[0])

      setUpdateAbility()
    }
  }
  return { setInit }
}
