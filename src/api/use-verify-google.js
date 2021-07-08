import { useFetch } from '@/api/use-fetch'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex'

const useVerifyGoogle = () => {
  const store = useStore()

  const { response, error, fetching, fetchData } = useFetch('/otps/verify', {
    method: 'post',
  })

  const verifyGoogle = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
    store.commit('auth/setOtpType', 'google')
    ElNotification.error({
      title: 'Success',
      message: 'This is a success message',
      type: 'success',
    })
  }

  return {
    response,
    error,
    fetching,
    verifyGoogle,
  }
}

export { useVerifyGoogle }
