import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchMemberAssetsSchema } from './vueQuery/fetch-member-assets-schema'

const useFetchMemberAssetsSchema = (id) => {
  const queryKey = reactive(['memberAssetsSchema', id])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchMemberAssetsSchema,
    select: ({ data }) => {
      return data
    },
  })

  return {
    ...query,
  }
}

export { useFetchMemberAssetsSchema }
