import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'
import { useAlert } from '@/utils/use-alert'

const useCreatePassword = () => {
  const router = useRouter()
  const { response, error, fetching, fetchData } = useFetch('/password/create', {
    method: 'POST',
  })

  const createPassword = async (body) => {
    await fetchData({ body })

    if (response.value.status === 204) {
      router.push({ name: 'home' })
    } else {
      useAlert({
        type: 'error',
        title: 'Error',
        message: error.value,
      })
    }
  }

  return {
    response,
    error,
    fetching,
    createPassword,
  }
}

export { useCreatePassword }
