import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchClientsDocsTypes } from './vueQuery/fetch-clients-docs-types'

export const useFetchClientsDocsTypes = (options = {}) => {
  const queryKey = reactive([['clients-docs-types']])

  const query = useQuery(queryKey, {
    queryFn: fetchClientsDocsTypes,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
