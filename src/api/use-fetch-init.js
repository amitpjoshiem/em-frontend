import { useFetch } from '@/api/use-fetch'

const useFetchInit = () => {
  const { response, error, fetching, fetchData } = useFetch(`/init`, {
    method: 'GET',
  })

  const getInit = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    getInit,
  }
}

export { useFetchInit }
