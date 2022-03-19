import { useFetchInit } from '@/api/use-fetch-init.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useSetUpdateAbility } from '@/hooks/use-set-update-ability.js'

export function useSetRole() {
  const store = useStore()
  const router = useRouter()

  const { isError, data: init, refetch } = useFetchInit({ enabled: false })
  const { setUpdateAbility } = useSetUpdateAbility()

  const setRole = async () => {
    await refetch.value()
    if (!isError.value) {
      store.commit('auth/setRole', init.value.roles[0])
      setUpdateAbility()
      store.commit('auth/setAuthUser', true)
      router.push({ name: 'dashboard' })
    }
  }
  return { setRole }
}
