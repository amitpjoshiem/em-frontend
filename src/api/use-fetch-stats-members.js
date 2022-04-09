import { useQuery } from 'vue-query'
import { fetchStatsMembers } from './vueQuery/fetch-stats-members'

export const useFetchStatsMembers = () => {
  const { isLoading, isError, isFetching, data, isFetched } = useQuery(['stats-members'], () => {
    return fetchStatsMembers()
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
    isFetched,
  }
}
