import { useFetch } from '@/api/use-fetch'
import { useAlert } from '@/utils/use-alert'

const useChangePassword = () => {
  const { response, error, fetching, fetchData } = useFetch('/password', {
    method: 'PUT',
  })

  const changePassword = async (body) => {
    await fetchData({ body })
    if (error.value !== null) {
      useAlert({
        type: 'error',
        title: 'Error',
        message: error.value,
      })
      return
    }
  }

  return {
    response,
    error,
    fetching,
    changePassword,
  }
}

export { useChangePassword }
