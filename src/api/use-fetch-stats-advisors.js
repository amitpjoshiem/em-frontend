import { useQuery } from 'vue-query'
import { fetchStatsAdvisors } from './vueQuery/fetch-stats-advisors'

export const useFetchStatsAdvisors = () => {
  const { isLoading, isError, isFetching, data, isFetched } = useQuery(['stats-advisors'], () => {
    return fetchStatsAdvisors()
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
    isFetched,
  }
}
