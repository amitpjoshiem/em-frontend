import { useQuery } from 'vue-query'
import { fetchDashboardLastActivity } from './vueQuery/fetch-dashboard-last-activity'

export const useDashboardLastActivity = () => {
  const { isLoading, isError, isFetching, data } = useQuery(['dashboard/activity'], () => {
    return fetchDashboardLastActivity()
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
  }
}
