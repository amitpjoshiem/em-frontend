import { useQuery } from 'vue-query'
import { fetchClientReportsAll } from './vueQuery/fetch-client-reports-all'

export const useClientReportsAll = (id) => {
  const { isLoading, isError, data } = useQuery(['clientReportAll', id], () => {
    return fetchClientReportsAll(id)
  })

  return {
    isLoading,
    isError,
    data,
  }
}
