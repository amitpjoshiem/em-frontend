import { useFetch } from '@/api/use-fetch'

const useNotificationTest = () => {
  const { response, error, fetching, fetchData } = useFetch(`/notification/test`, {
    method: 'GET',
  })

  const getNotificationTest = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    getNotificationTest,
  }
}

export { useNotificationTest }
