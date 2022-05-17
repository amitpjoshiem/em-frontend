import { useFetch } from '@/api/use-fetch'
import { useAlert } from '@/utils/use-alert'
import store from '@/store'
import { useSetInit } from '@/hooks/use-set-init'

const useOtp = () => {
  const { response, error, fetching, fetchData } = useFetch('/otps/verify', {
    method: 'POST',
  })
  const { setInit } = useSetInit()

  const otpAuth = async (body) => {
    await fetchData({ body })
    storeAccessRole()
  }

  const storeAccessRole = async () => {
    if (error.value !== null) {
      useAlert({
        type: 'error',
        title: 'Error',
        message: error.value,
      })
      return
    }
    store.commit('auth/setAuthUser', true)
    await setInit()
  }

  return {
    response,
    error,
    fetching,
    otpAuth,
  }
}

export { useOtp }
