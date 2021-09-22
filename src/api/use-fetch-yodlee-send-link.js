import { useFetch } from '@/api/use-fetch'

const useFetchYodleeSendLink = (id) => {
  const { response, error, fetching, fetchData } = useFetch(`/yodlee/${id}/link`, {
    method: 'GET',
  })

  const sendLink = async () => {
    await fetchData({})
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    sendLink,
  }
}

export { useFetchYodleeSendLink }
