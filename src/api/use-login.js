import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { saveToStorage } from '@/utils/utilsLocalStorage'
import { authService } from './fetcher/AuthService'

const useLogin = () => {
  const router = useRouter()

  const { response, headers, error, fetching, fetchData } = useFetch('/login', {
    method: 'POST',
  })

  const storeAccessTokenAndRedirectToDashboard = () => {
    authService.setToken(response.value.access_token)
    saveToStorage(localStorage, 'access_token', response.value.access_token)
    saveToStorage(
      localStorage,
      'otp-type',
      headers.value['x-otp-type'] ? headers.value['x-otp-type'] : ''
    )
    if (headers.value['x-otp-type']) {
      router.push({ name: 'otp' })
    } else {
      router.push({ name: 'dashboard' })
    }
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
