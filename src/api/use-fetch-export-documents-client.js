import { useQuery } from 'vue-query'
import { reactive, ref } from 'vue'
import { fetchExportDocumentsClient } from './vueQuery/fetch-export-documents-client'

export const useFetchExportDocumentsClient = ({ id, type }, options = {}) => {
  const reactiveType = ref(type)

  const queryKey = reactive([
    ['exportDocumentsClient', id],
    {
      reactiveType,
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
