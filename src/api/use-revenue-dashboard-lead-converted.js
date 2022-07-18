import { useQuery } from 'vue-query'
import { fetchRevenueDashboardLeadConverted } from './vueQuery/fetch-revenue-dashboard-lead-converted'

import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export const useRevenueDashboardLeadConverted = () => {
  const store = useStore()

  const type = computed(() => store.state.globalComponents.selectFilter.values.numberLeedsConverted)
  const reactiveType = ref(type)

  const queryKey = reactive([
    'revenueDashboard/converted',
    {
      reactiveType,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchRevenueDashboardLeadConverted,
  })

  return {
    ...query,
  }
}
