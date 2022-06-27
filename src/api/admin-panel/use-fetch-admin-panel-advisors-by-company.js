import { useQuery } from 'vue-query'
import { fetchAdminPanelAdvisorsByCompany } from '../vueQuery/admin-panel/fetch-admin-panel-advisors-by-company.js'
import { useStore } from 'vuex'
import { reactive, computed, ref } from 'vue'

export const useFetchAdminPanelAdvisorsByCompany = (options = {}) => {
  const store = useStore()
  const id = computed(() => store.state.adminPanelUsers.currentCompanyId)

  const reactiveId = ref(id)

  const queryKey = reactive([
    ['admin-panel-advisors-by-company'],
    {
      reactiveId,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchAdminPanelAdvisorsByCompany,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
