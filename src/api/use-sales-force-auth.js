import { useQuery } from 'vue-query'
import { fetchSalesForceAuth } from './vueQuery/fetch-sales-force-auth'

export const useSalesForceAuth = () => {
  const { isLoading, fetching, isError, refetch, data } = useQuery(['salesForceAuth'], () => {
    return fetchSalesForceAuth()
  })

  return {
    isLoading,
    fetching,
    isError,
    refetch,
    data,
  }
}
