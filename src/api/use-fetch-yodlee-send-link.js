import { useFetch } from '@/api/use-fetch'
import { useAlert } from '@/utils/use-alert'

const useFetchYodleeSendLink = (id) => {
  const { response, error, fetching, fetchData } = useFetch(`/yodlee/${id}/link`, {
    method: 'GET',
  })

  const sendLink = async () => {
    await fetchData({})
    if (error.value !== null) {
      useAlert({
        title: 'Error',
        type: 'error',
        message: error.value,
      })
      return
    }
    useAlert({
      title: 'Success',
      type: 'success',
      message: 'Link sent successfully.',
    })
  }

  return {
    response,
    error,
    fetching,
    sendLink,
  }
}

export { useFetchYodleeSendLink }
