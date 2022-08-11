import { useQuery } from 'vue-query'
import { fetchRevenueDashboardLeadCreated } from './vueQuery/fetch-revenue-dashboard-lead-created'

import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export const useRevenueDashboardLeadCreated = () => {
  const store = useStore()

  const type = computed(() => store.state.globalComponents.selectFilter.values.countLeeds)
  const reactiveType = ref(type)

  const queryKey = reactive([
    'revenueDashboard/created',
    {
      reactiveType,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchRevenueDashboardLeadCreated,
  })

  return {
    ...query,
  }
}
