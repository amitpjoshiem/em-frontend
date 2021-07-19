import { useFetch } from '@/api/use-fetch'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const useOtp = () => {
  const store = useStore()
  const router = useRouter()

  const { response, error, fetching, fetchData } = useFetch('/otps/verify', {
    method: 'POST',
  })

  const otpAuth = async (body) => {
    await fetchData({ body })
    if (error.value !== null) {
      ElNotification.error({
        title: 'Error',
        message: error.value,
        offset: 100,
      })
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
