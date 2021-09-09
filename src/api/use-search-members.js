import { useQuery } from 'vue-query'
import { UserFullInfo } from '@/dto/UserFullInfo'
import { reactive, ref } from 'vue'
import { fetchMembersSearch } from './vueQuery/search-members'

export const useSearchMembers = ({ search }, options = {}) => {
  const reactiveSearch = ref(search)

  const queryKey = reactive([
    'members',
    {
      reactiveSearch,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchMembersSearch,
    select: ({ data }) => {
      return data.map((houseHolder) => new UserFullInfo(houseHolder))
    },
    ...options,
  })

  return {
    ...query,
  }
}
