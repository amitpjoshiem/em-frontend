import { useQuery } from 'vue-query'
import { fetchDashboardPipeLine } from './vueQuery/fetch-dashboard-pipeline'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export const useDashboardPipeLine = () => {
  const store = useStore()

  const type = computed(() => store.state.globalComponents.selectFilter.values.pipeLine)
  const reactiveType = ref(type)

  const queryKey = reactive([
    'dashboardPipeLine',
    {
      reactiveType,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchDashboardPipeLine,
  })

  return {
    ...query,
  }
}
