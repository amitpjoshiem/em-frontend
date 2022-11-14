import { useQuery } from 'vue-query'
import { fetchSummaryInfo } from './vueQuery/fetch-summary-info'
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export const useFetchSummaryInfo = (options = {}) => {
  const store = useStore()

  const reactiveId = computed(() => store.state.globalComponents.summaryInfoMemberId)

  const queryKey = reactive([
    ['summary-info'],
    {
      reactiveId,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchSummaryInfo,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
