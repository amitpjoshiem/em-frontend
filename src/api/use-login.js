import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { saveToStorage } from '@/utils/utilsLocalStorage'

const useLogin = () => {
  const router = useRouter()

  const { response, headers, error, fetching, fetchData } = useFetch('/login', {
    method: 'POST',
  })

  const storeAccessTokenAndRedirectToDashboard = () => {
    saveToStorage(localStorage, 'access_token', response.value.access_token)
    saveToStorage(localStorage, 'otp-type', headers.value['x-otp-type'])
    router.push({ name: 'otp' })
  }

  const login = async (body) => {
    await fetchData({ body })
    if (error.value !== null) {
      ElNotification.error({
        title: 'Error',
        message: error.value,
        offset: 100,
      })
      return
    }
    storeAccessTokenAndRedirectToDashboard()
  }

  return {
    response,
    error,
    fetching,
    login,
  }
}

export { useLogin }
