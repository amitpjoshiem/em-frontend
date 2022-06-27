import { useQuery } from 'vue-query'
import { fetchAdminPanelUsers } from '../vueQuery/admin-panel/fetch-admin-panel-users'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export const useFetchAdminPanelUsers = (page) => {
  const store = useStore()

  const limit = computed(() => store.state.adminPanelUsers.limit)
  const roleFilter = computed(() => store.state.adminPanelUsers.filterRoleAdminPanel)
  const companyFilter = computed(() => store.state.adminPanelUsers.filterCompanyAdminPanel)
  const userFilter = computed(() => store.state.adminPanelUsers.filterUserAdminPanel)

  const reactiveLimit = ref(limit)
  const reactivePage = ref(page)
  const reactiveRoleFilter = ref(roleFilter)
  const reactiveCompanyFilter = ref(companyFilter)
  const reactiveUserFilter = ref(userFilter)

  const queryKey = reactive([
    'admin-panel-users',
    {
      reactiveLimit,
      reactivePage,
      reactiveRoleFilter,
      reactiveCompanyFilter,
      reactiveUserFilter,
    },
  ])

  let pagination = reactive({})

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchAdminPanelUsers,
    select: ({ data, meta }) => {
      pagination.value = meta.pagination
      return data
    },
  })

  return {
    ...query,
    pagination,
  }
}
