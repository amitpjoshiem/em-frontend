import { useFetch } from '@/api/use-fetch'

const useNotificationChannel = () => {
  const { response, error, fetching, fetchData } = useFetch(`/notification/channel`, {
    method: 'GET',
  })

  const getNotificationChannel = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    getNotificationChannel,
  }
}

export { useNotificationChannel }
