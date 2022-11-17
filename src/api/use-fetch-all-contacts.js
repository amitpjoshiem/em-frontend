import { useQuery } from 'vue-query'
import { Contacts } from '@/dto/Contacts'
import { fetchAllContacts } from './vueQuery/fetch-all-contacts'

export const useFetchAllContacts = (id) => {
  const { isLoading, isError, isFetching, data, isFetched, refetch } = useQuery(
    ['contacts-all', id],
    () => {
      return fetchAllContacts(id)
    },
    {
      select: (data) => {
        if (data && data.data) return data.data.map((contact) => new Contacts(contact))
        return []
      },
    }
  )

  return {
    isLoading,
    isError,
    isFetching,
    data,
    isFetched,
    refetch,
  }
}
