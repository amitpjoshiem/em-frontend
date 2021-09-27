import { useQuery } from 'vue-query'
import { UserFullInfo } from '@/dto/UserFullInfo'
import { MembersListPagination } from '@/dto/MembersListPagination'
import { fetchMembersList } from './vueQuery/fetch-members-list'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export const useListHouseholders = ({ type, page }) => {
  const store = useStore()

  const limit = computed(() => store.state.globalComponents.itemsPerPage.values.listOfHouseholds)
  const orderBy = computed(() => store.state.globalComponents.sortMembers.orderBy)
  const sortedBy = computed(() => {
    if (store.state.globalComponents.sortMembers.sortedBy === 'ascending') return 'asc'
    if (store.state.globalComponents.sortMembers.sortedBy === 'descending') return 'desc'
    return undefined
  })

  const reactiveType = ref(type)
  const reactiveLimit = ref(limit)
  const reactiveOrderBy = ref(orderBy)
  const reactiveSortedBy = ref(sortedBy)
  const reactivePage = ref(page)

  const queryKey = reactive([
    'householders',
    {
      reactiveType,
      reactiveLimit,
      reactiveOrderBy,
      reactiveSortedBy,
      reactivePage,
    },
  ])

  let pagination = reactive({})

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchMembersList,
    select: ({ data, meta }) => {
      pagination.value = new MembersListPagination(meta.pagination)
      return data.map((houseHolder) => new UserFullInfo(houseHolder))
    },
  })

  return {
    ...query,
    pagination,
  }
}
