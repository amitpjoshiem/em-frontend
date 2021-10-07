import { useQuery } from 'vue-query'
import { fetchDashboardMembers } from './vueQuery/fetch-dashboard-members'

export const useDashboardMembers = () => {
  const { isLoading, isError, isFetching, data } = useQuery(['dashboard/members'], () => {
    return fetchDashboardMembers()
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
  }
}
