import { useQuery } from 'vue-query'
import { reactive, ref } from 'vue'
import { fetchExportDocumentsBlueprint } from './vueQuery/fetch-export-documents-blueprint'

export const useFetchExportDocumentsBlueprint = ({ id, type }, options = {}) => {
  const reactiveType = ref(type)

  const queryKey = reactive([
    ['exportDocumentsBlueprint', id],
    {
      reactiveType,
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
