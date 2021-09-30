import { useQuery } from 'vue-query'
import { fetchActivities } from './vueQuery/fetch-activities'

export const useFetchActivities = () => {
  const { isLoading, isError, isFetching, refetch, data } = useQuery(['activities'], () => {
    return fetchActivities()
  })

  return {
    isLoading,
    isError,
    data,
    refetch,
    isFetching,
  }
}
