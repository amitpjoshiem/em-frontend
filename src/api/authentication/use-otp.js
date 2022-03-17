import { useFetch } from '@/api/use-fetch'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useAlert } from '@/utils/use-alert'

import { useFetchInit } from '@/api/use-fetch-init.js'

const useOtp = () => {
  const store = useStore()
  const router = useRouter()

  const { response, error, fetching, fetchData } = useFetch('/otps/verify', {
    method: 'POST',
  })

  const {
    isLoading: isLoadingInit,
    isError: isErrorInit,
    data: init,
    refetch: refetchInit,
  } = useFetchInit({ enabled: false })

  const otpAuth = async (body) => {
    await fetchData({ body })
    storeAccessRole()
  }

  const storeAccessRole = async () => {
    await refetchInit.value()

    if (error.value !== null) {
      useAlert({
        type: 'error',
        title: 'Error',
        message: error.value,
      })
      error.value = null
      return
    }

    store.commit('auth/setRole', init.value.roles[0])
    store.commit('auth/setAuthUser', true)
    router.push({ name: 'dashboard' })
  }

  return {
    response,
    error,
    fetching,
    otpAuth,

    init,
    refetchInit,
    isErrorInit,
    isLoadingInit,
  }
}

export { useOtp }
