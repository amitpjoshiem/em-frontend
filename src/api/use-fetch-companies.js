import { useFetch } from '@/api/use-fetch'

const useFetchCompanies = () => {
  const { response, error, fetching, fetchData } = useFetch(`/companies`, {
    method: 'GET',
  })

  const getCompanies = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    getCompanies,
  }
}

export { useFetchCompanies }
