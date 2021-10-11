import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'

const useResetPassword = () => {
  const router = useRouter()
  const { response, error, fetching, fetchData } = useFetch('/password/reset', {
    method: 'POST',
  })

  const resetPassword = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
    router.push({ name: 'home' })
  }

  return {
    response,
    error,
    fetching,
    resetPassword,
  }
}

export { useResetPassword }
