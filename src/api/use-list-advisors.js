import { useQuery } from 'vue-query'
import { fetchAdvisorsList } from './vueQuery/fetch-advisors-list'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export const useListAdvisors = ({ page }, options = {}) => {
  const store = useStore()

  const reactiveId = computed(() => store.state.globalComponents.currentCompany.id)
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
      pagination.value = meta.pagination
      return data
    },
    ...options,
  })

  return {
    ...query,
    pagination,
  }
}
