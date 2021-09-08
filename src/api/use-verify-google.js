import { useFetch } from '@/api/use-fetch'
import { useStore } from 'vuex'
import { saveToStorage } from '@/utils/utilsLocalStorage'

const useVerifyGoogle = () => {
  const store = useStore()

  const { response, error, fetching, fetchData } = useFetch('/otps/change', {
    method: 'post',
  })

  const verifyGoogle = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
    store.commit('auth/setOtpType', body.service)
    saveToStorage(localStorage, 'otp-type', body.service)
  }

  return {
    response,
    error,
    fetching,
    verifyGoogle,
  }
}

export { useVerifyGoogle }
