import { useQuery } from 'vue-query'
import { fetchClientReportsAll } from './vueQuery/fetch-client-reports-all'
import { useStore } from 'vuex'

import { computed, reactive, ref } from 'vue'

export const useClientReportsAll = (id) => {
  const store = useStore()
  const dateRange = computed(() => store.state.globalComponents.dateRangeClientReport)
  const reactiveDateRange = ref(dateRange)
  const reactiveId = ref(id)

  const queryKey = reactive([
    ['client-report-list'],
    {
      reactiveId,
      reactiveDateRange,
    },
  ])

  const query = useQuery(queryKey, {
    queryFn: fetchClientReportsAll,
    select: ({ data }) => {
      return data
    },
  })

  return {
    ...query,
  }
}
