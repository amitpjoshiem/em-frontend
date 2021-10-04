import { useQuery } from 'vue-query'
import { fetchActivities } from './vueQuery/fetch-activities'
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'

export const useFetchActivities = (_, options = {}) => {
  const store = useStore()

  const limit = computed(() => store.state.globalComponents.activity.limit)
  const searchFields = computed(() => store.state.globalComponents.activity.searchFields)
  const search = computed(() => store.state.globalComponents.activity.period)

  const reactiveLimit = ref(limit)
  const reactiveSearchFields = ref(searchFields)
  const reactiveSearch = ref(search)

  const queryKey = reactive([
    'activities',
    {
      reactiveLimit,
      reactiveSearchFields,
      reactiveSearch,
    },
  ])
  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchActivities,
    ...options,
  })

  return {
    ...query,
  }
}
