import { useFetch } from '@/api/use-fetch'
import { useAlert } from '@/utils/use-alert'

const useNotificationTest = () => {
  const { response, error, fetching, fetchData } = useFetch(`/notification/test`, {
    method: 'GET',
  })

  const getNotificationTest = async (body) => {
    await fetchData({ body })

    if (response.value.status === 204) {
      useAlert({
        title: 'Success',
        type: 'success',
        message: 'Test notification success send',
      })
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
    getNotificationTest,
  }
}

export { useNotificationTest }
