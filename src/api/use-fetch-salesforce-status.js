import { useQuery } from 'vue-query'
import { fetchSalesforceStatus } from './vueQuery/fetch-salesforce-status'

export const useFetchSalesforceStatus = (id) => {
  const { isLoading, isError, isFetching, data, isFetched } = useQuery(['salesforce/status', id], () => {
    return fetchSalesforceStatus(id)
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
    isFetched,
  }
}
