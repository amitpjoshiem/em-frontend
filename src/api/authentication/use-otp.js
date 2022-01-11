import { useFetch } from '@/api/use-fetch'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useAlert } from '@/utils/use-alert'

const useOtp = () => {
  const store = useStore()
  const router = useRouter()

  const { response, error, fetching, fetchData } = useFetch('/otps/verify', {
    method: 'POST',
  })

  const otpAuth = async (body) => {
    await fetchData({ body })
    if (error.value !== null) {
      useAlert({
        type: 'error',
        title: 'Error',
        message: error.value,
      })
      error.value = null
      return
    }
    store.commit('auth/setAuthUser', true)
    router.push({ name: 'dashboard' })
  }

  return {
    response,
    error,
    fetching,
    otpAuth,
  }
}

export { useOtp }
