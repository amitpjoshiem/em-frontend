import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { tokenStorage } from '@/api/api-client/TokenStorage'
import { apiClient } from './api-client/ApiClient'

const useLogin = () => {
  const router = useRouter()

  const { response, headers, error, fetching, fetchData } = useFetch('/login', {
    method: 'POST',
  })

  const storeAccessTokenAndRedirectToDashboard = () => {
    const token = response.value.access_token
    tokenStorage.setByKey('access_token', token)
    apiClient.authenticate(token)
    tokenStorage.setByKey(
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
