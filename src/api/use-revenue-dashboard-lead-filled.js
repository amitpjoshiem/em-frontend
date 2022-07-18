import { useQuery } from 'vue-query'
import { fetchRevenueDashboardLeadFilled } from './vueQuery/fetch-revenue-dashboard-lead-filled'

import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export const useRevenueDashboardLeadFilled = () => {
  const store = useStore()

  const type = computed(() => store.state.globalComponents.selectFilter.values.numberLeedsFilledData)
  const reactiveType = ref(type)

  const queryKey = reactive([
    'revenueDashboard/filled',
    {
      reactiveType,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchRevenueDashboardLeadFilled,
  })

  return {
    ...query,
  }
}
