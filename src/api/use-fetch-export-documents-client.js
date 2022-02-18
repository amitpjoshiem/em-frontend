import { useQuery } from 'vue-query'
import { reactive, ref } from 'vue'
import { fetchExportDocumentsClient } from './vueQuery/fetch-export-documents-client'

export const useFetchExportDocumentsClient = ({ id, type }, options = {}) => {
  const sortedBy = 'desc'
  const orderBy = 'created_at'

  const reactiveType = ref(type)
  const reactiveSortedBy = ref(sortedBy)
  const reactiveOrderBy = ref(orderBy)

  const queryKey = reactive([
    ['exportDocumentsClient', id],
    {
      reactiveType,
      reactiveSortedBy,
      reactiveOrderBy,
    },
  ])

  const query = useQuery(queryKey, {
    queryFn: fetchExportDocumentsClient,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
