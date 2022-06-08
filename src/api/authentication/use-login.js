import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'
import { tokenStorage } from '@/api/api-client/TokenStorage'
import { apiClient } from '@/api/api-client/ApiClient'
import { useSetInit } from '@/hooks/use-set-init'
import { useAlert } from '@/utils/use-alert'
import { useStore } from 'vuex'

const useLogin = () => {
  const router = useRouter()
  const store = useStore()

  const { setInit } = useSetInit()

  const { response, headers, error, fetching, fetchData } = useFetch('/login', {
    method: 'POST',
  })

  const storeAccessTokenAndRedirectToDashboard = async () => {
    const token = response.value.access_token
    tokenStorage.setByKey('access_token', token)
    apiClient.authenticate(token)
    const otpType = headers.value['x-otp-type'] ? headers.value['x-otp-type'] : null
    const otpEnabled = headers.value['x-otp-enabled'] ? headers.value['x-otp-enabled'] : null
    tokenStorage.setByKey('otp-type', otpType)
    tokenStorage.setByKey('otp-enabled', otpEnabled)
    store.commit('auth/setOtpType', otpType)

    if (otpEnabled === 'true' && otpType !== null) {
      router.push({ name: 'otp' })
    }

    if (otpEnabled === 'false') {
      store.commit('auth/setAuthUser', true)
      await setInit()
      router.push({ path: '/' })
    }
  }

  const login = async (body) => {
    await fetchData({ body })
    if (error.value !== null) {
      useAlert({ type: 'error', title: 'Error', message: error.value })
      error.value = null
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
