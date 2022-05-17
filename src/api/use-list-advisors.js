import { useQuery } from 'vue-query'
import { fetchAdvisorsList } from './vueQuery/fetch-advisors-list'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { UsersListPagination } from '@/dto/UsersListPagination'

export const useListAdvisors = ({ page }) => {
  const store = useStore()

  const reactiveId = computed(() => store.state.globalComponents.currentCompanyId)
  const limit = computed(() => store.state.globalComponents.itemsPerPage.values.superAdminListAdvisors)

  const orderBy = computed(() => store.state.globalComponents.sortMembers.orderBy)
  const sortedBy = computed(() => {
    if (store.state.globalComponents.sortMembers.sortedBy === 'ascending') return 'asc'
    if (store.state.globalComponents.sortMembers.sortedBy === 'descending') return 'desc'
    return undefined
  })

  const reactiveLimit = ref(limit)
  const reactiveOrderBy = ref(orderBy)
  const reactiveSortedBy = ref(sortedBy)
  const reactivePage = ref(page)

  const queryKey = reactive([
    ['advisors-list'],
    {
      reactiveLimit,
      reactiveOrderBy,
      reactiveSortedBy,
      reactivePage,
      reactiveId,
    },
  ])

  let pagination = reactive({})

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchAdvisorsList,
    select: ({ data, meta }) => {
      pagination.value = new UsersListPagination(meta.pagination)
      return data
    },
  })

  return {
    ...query,
    pagination,
  }
}
