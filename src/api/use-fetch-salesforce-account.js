import { useQuery } from 'vue-query'
import { fetchSalesforceAccount } from './vueQuery/fetch-salesforce-account'

export const useFetchSalesforceAccount = (id) => {
  const { isLoading, isError, isFetching, data, isFetched } = useQuery(['salesforce/account', id], () => {
    return fetchSalesforceAccount(id)
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
    isFetched,
  }
}
