import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const useCreatePassword = () => {
  const router = useRouter()
  const { response, error, fetching, fetchData } = useFetch(
    '/password/create',
    {
      method: 'POST',
    }
  )

  const createPassword = async (body) => {
    await fetchData({ body })

    if (response.value.status === 204) {
      router.push({ name: 'home' })
    } else {
      ElNotification.error({
        title: 'Error',
        message: error.value,
        offset: 100,
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
