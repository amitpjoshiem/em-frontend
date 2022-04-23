import { useFetch } from '@/api/use-fetch'
import { useAlert } from '@/utils/use-alert'
import { useRouter } from 'vue-router'
import store from '@/store'

const useOtp = () => {
  const { response, error, fetching, fetchData } = useFetch('/otps/verify', {
    method: 'POST',
  })

  const router = useRouter()

  const otpAuth = async (body) => {
    await fetchData({ body })
    storeAccessRole()
  }

  const storeAccessRole = () => {
    if (error.value !== null) {
      useAlert({
        type: 'error',
        title: 'Error',
        message: error.value,
      })
      return
    }
    store.commit('auth/setAuthUser', true)
    router.push({ path: '/' })
  }

  return {
    response,
    error,
    fetching,
    otpAuth,
  }
}

export { useOtp }
