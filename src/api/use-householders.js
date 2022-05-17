import { useQuery } from 'vue-query'
import { UserFullInfo } from '../dto/UserFullInfo'
import { fetchMembersList } from './vueQuery/fetch-members-list'
import { computed, reactive, ref } from 'vue'

import { useStore } from 'vuex'

export const useHouseholders = () => {
  const store = useStore()

  const houseHolderType = computed(() => {
    return store.state.dashboard.houseHolderType
  })

  const orderBy = computed(() => store.state.globalComponents.sortMembers.orderBy)
  const sortedBy = computed(() => {
    if (store.state.globalComponents.sortMembers.sortedBy === 'ascending') return 'asc'
    if (store.state.globalComponents.sortMembers.sortedBy === 'descending') return 'desc'
    return undefined
  })
  const limit = computed(() => store.state.globalComponents.itemsPerPage.values.advisorDashboard)

  const reactiveType = ref(houseHolderType)
  const reactiveLimit = ref(limit)
  const reactiveOrderBy = ref(orderBy)
  const reactiveSortedBy = ref(sortedBy)

  const queryKey = reactive([
    'householders',
    {
      reactiveType,
      reactiveLimit,
      reactiveOrderBy,
      reactiveSortedBy,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchMembersList,
    select: ({ data }) => {
      return data.map((houseHolder) => new UserFullInfo(houseHolder))
    },
  })

  return {
    ...query,
  }
}
