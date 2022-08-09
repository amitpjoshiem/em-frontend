import { fetchStatsMembers } from './vueQuery/fetch-stats-members'
import { useQuery } from 'vue-query'
import { reactive, ref } from 'vue'

export const useFetchStatsMembers = (type) => {
  const reactiveType = ref(type)

  const queryKey = reactive([
    ['stats-members'],
    {
      reactiveType,
    },
  ])

  const query = useQuery(queryKey, {
    queryFn: fetchStatsMembers,
    select: ({ data }) => {
      return data
    },
  })

  return {
    ...query,
  }
}
