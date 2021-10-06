import { useQuery } from 'vue-query'
import { fetchDashboardOpportunities } from './vueQuery/fetch-dashboard-opportunities'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export const useDashboardOpportunities = () => {
  const store = useStore()

  const type = computed(() => store.state.globalComponents.selectFilter.values.opportunities)
  const reactiveType = ref(type)

  const queryKey = reactive([
    'dashboardOpportunities',
    {
      reactiveType,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchDashboardOpportunities,
  })

  return {
    ...query,
  }
}
