import { useQuery } from 'vue-query'
import { fetchRevenueDashboardLeadClosed } from './vueQuery/fetch-revenue-dashboard-lead-closed'

import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export const useRevenueDashboardLeadClosed = () => {
  const store = useStore()

  const type = computed(() => store.state.globalComponents.selectFilter.values.numberLeedsClosed)
  const reactiveType = ref(type)

  const queryKey = reactive([
    'revenueDashboard/closed',
    {
      reactiveType,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchRevenueDashboardLeadClosed,
  })

  return {
    ...query,
  }
}
