import { useFetch } from '@/api/use-fetch'
import { useRouter } from 'vue-router'
import { useAlert } from '@/utils/use-alert'

const useResetPassword = () => {
  const router = useRouter()
  const { response, error, fetching, fetchData } = useFetch('/password/reset', {
    method: 'POST',
  })

  const resetPassword = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
    useAlert({
      title: 'Success',
      type: 'success',
      message: 'Password created  successfully.',
    })
    // router.push({ name: 'home' })
    router.push({ path: '/' })
  }

  return {
    response,
    error,
    fetching,
    resetPassword,
  }
}

export { useResetPassword }
