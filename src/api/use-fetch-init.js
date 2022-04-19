import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchInit } from './vueQuery/fetch-init'

export const useFetchInit = (options = {}) => {
  const queryKey = reactive([['init']])

  const query = useQuery(queryKey, {
    queryFn: fetchInit,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
