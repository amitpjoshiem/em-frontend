import { useQuery } from 'vue-query'
import { fetchYodleeStatus } from './vueQuery/fetch-yodlee-status'

export const useYodleeStatus = (id) => {
  const { isLoading, isError, isFetching, refetch, data } = useQuery(['yodlee/status', id], () => {
    return fetchYodleeStatus(id)
  })

  return {
    isLoading,
    isError,
    data,
    refetch,
    isFetching,
  }
}
