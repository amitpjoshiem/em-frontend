import { useQuery } from 'vue-query'
import { fetchTaxQualificationInit } from './vueQuery//fetch-tax-qualification-init.js'

import { reactive } from 'vue'

export const useFetchTaxQualificationInit = (options) => {
  const queryKey = reactive(['tax-qualification-init'])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchTaxQualificationInit,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
