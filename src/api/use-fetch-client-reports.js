import { useQuery } from 'vue-query'
import { fetchClientReports } from './vueQuery/fetch-client-reports'

export const useClientReports = (id) => {
  const { isLoading, isError, data } = useQuery(['clientReport', id], () => {
    return fetchClientReports(id)
  })

  return {
    isLoading,
    isError,
    data,
  }
}
