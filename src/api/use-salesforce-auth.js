import { useFetch } from '@/api/use-fetch'

const useSalesForceAuth = () => {
  const { response, error, fetching, fetchData } = useFetch(
    '/salesforce/auth/settings',
    {
      method: 'GET',
    }
  )

  const getSalesForceAuth = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    getSalesForceAuth,
  }
}

export { useSalesForceAuth }
