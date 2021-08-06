import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'

const useResetPassword = () => {
  const { response, error, fetching, fetchData } = useFetch('/password/reset', {
    method: 'POST',
  })

  const newPass = async (body) => {
    const router = useRouter()
    await fetchData({ body })
    if (error.value !== null) return
    router.push({ name: 'login' })
  }

  return {
    response,
    error,
    fetching,
    newPass,
  }
}

export { useResetPassword }
