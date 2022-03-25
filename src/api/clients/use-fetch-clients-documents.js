import { useQuery } from 'vue-query'
import { reactive, ref } from 'vue'
import { fetchClientsDocuments } from '../vueQuery/clients/fetch-clients-documents'

export const useFetchClientDocuments = ({ collection }, options = {}) => {
  const sortedBy = 'desc'
  const orderBy = 'created_at'

  const reactiveSortedBy = ref(sortedBy)
  const reactiveOrderBy = ref(orderBy)

  const queryKey = reactive([
    ['clientsDocuments', collection],
    {
      reactiveSortedBy,
      reactiveOrderBy,
    },
  ])

  const query = useQuery(queryKey, {
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
