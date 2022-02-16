import { useQuery } from 'vue-query'
import { reactive, ref } from 'vue'
import { fetchExportDocumentsClient } from './vueQuery/fetch-export-documents-client'

export const useFetchExportDocumentsClient = ({ id, type }) => {
  const reactiveType = ref(type)

  const queryKey = reactive([
    ['exportDocumentsClient', id],
    {
      reactiveType,
    },
  ])

  const query = useQuery(queryKey, {
    // cacheTime: 0,
    queryFn: fetchExportDocumentsClient,
    select: ({ data }) => {
      return data
    },
  })

  return {
    ...query,
  }
}
