import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'
import { tokenStorage } from '@/api/api-client/TokenStorage'
import { apiClient } from '@/api/api-client/ApiClient'
import { useAlert } from '@/utils/use-alert'

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
      useAlert({ type: 'error', title: 'Error', message: error.value })
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
