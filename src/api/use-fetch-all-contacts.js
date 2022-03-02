import { useQuery } from 'vue-query'
import { fetchAllContacts } from './vueQuery/fetch-all-contacts'

export const useFetchAllContacts = (id) => {
  const { isLoading, isError, isFetching, data, isFetched, refetch } = useQuery(['contactsAll', id], () => {
    return fetchAllContacts(id)
  })

  return {
    isLoading,
    isError,
    isFetching,
    data,
    isFetched,
    refetch,
  }
}
