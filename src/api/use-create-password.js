import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'

const useCreatePassword = () => {
  const { response, error, fetching, fetchData } = useFetch(
    '/password/create',
    {
      method: 'POST',
    }
  )

  const createPassword = async (body) => {
    const router = useRouter()
    await fetchData({ body })
    if (error.value !== null) return
    router.push({ name: 'login' })
  }

  return {
    response,
    error,
    fetching,
    createPassword,
  }
}

export { useCreatePassword }
