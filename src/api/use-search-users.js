import { useQuery } from 'vue-query'
import { reactive, ref, computed } from 'vue'
import { fetchUsersSearch } from './vueQuery/search-users'
import { useStore } from 'vuex'

export const useSearchUsers = ({ search }, options = {}) => {
  const store = useStore()

  const reactiveSearch = ref(search)
  const companyFilter = computed(() => store.state.globalComponents.currentCompanyId)

  const reactiveCompanyFilter = ref(companyFilter)

  const queryKey = reactive([
    'users-search',
    {
      reactiveSearch,
      reactiveCompanyFilter,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchUsersSearch,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
