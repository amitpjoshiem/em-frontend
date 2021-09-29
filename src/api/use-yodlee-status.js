import { useFetch } from '@/api/use-fetch'

const useYodleeStatus = (id) => {
  const { response, error, fetching, fetchData } = useFetch(`/yodlee/${id}/status`, {
    method: 'GET',
  })

  const getYodleeStatus = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    getYodleeStatus,
  }
}

export { useYodleeStatus }
