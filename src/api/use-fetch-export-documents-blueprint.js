import { useQuery } from 'vue-query'
import { reactive, ref } from 'vue'
import { fetchExportDocumentsBlueprint } from './vueQuery/fetch-export-documents-blueprint'

export const useFetchExportDocumentsBlueprint = ({ id, type }, options = {}) => {
  const sortedBy = 'desc'
  const orderBy = 'created_at'

  const reactiveType = ref(type)
  const reactiveSortedBy = ref(sortedBy)
  const reactiveOrderBy = ref(orderBy)

  const queryKey = reactive([
    ['exportDocumentsBlueprint', id],
    {
      reactiveType,
      reactiveSortedBy,
      reactiveOrderBy,
    },
  ])

  const query = useQuery(queryKey, {
    queryFn: fetchExportDocumentsBlueprint,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
