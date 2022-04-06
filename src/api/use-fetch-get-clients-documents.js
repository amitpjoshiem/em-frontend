import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchGetClientsDocuments } from './vueQuery/fetch-get-clients-documents'

export const useFetchGetClientDocuments = ({ collection, id }, options = {}) => {
  const queryKey = reactive(['clientsDocuments', collection, id])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchGetClientsDocuments,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
