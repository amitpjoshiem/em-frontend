import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchClientsDocuments } from '../vueQuery/clients/fetch-clients-documents'

export const useFetchClientDocuments = ({ collection }, options = {}) => {
  const queryKey = reactive(['clientsDocuments', collection])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchClientsDocuments,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
