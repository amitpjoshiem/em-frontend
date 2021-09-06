import { useFetch } from '@/api/use-fetch'

const useLogoutSalesForce = () => {
  const { response, error, fetching, fetchData } = useFetch('/salesforce/auth/logout', {
    method: 'GET',
  })

  const logoutSalesForceAuth = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    logoutSalesForceAuth,
  }
}

export { useLogoutSalesForce }
