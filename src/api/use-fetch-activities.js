import { useInfiniteQuery } from 'vue-query'
import { fetchActivities } from './vueQuery/fetch-activities'
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'

export const useFetchActivities = () => {
  const store = useStore()

  const limit = computed(() => store.state.globalComponents.activity.limit)
  const searchFields = computed(() => store.state.globalComponents.activity.searchFields)
  const search = computed(() => store.state.globalComponents.activity.period)

  const reactiveLimit = ref(limit)
  const reactiveSearchFields = ref(searchFields)
  const reactiveSearch = ref(search)

  const queryKey = reactive([
    'activity',
    {
      reactiveLimit,
      reactiveSearchFields,
      reactiveSearch,
    },
  ])

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, refetch, isLoading } =
    useInfiniteQuery(
      [
        'activity',
        {
          reactiveSearch: `created_at:2021-09-28,2021-10-05`,
          reactiveLimit: `0`,
          reactiveSearchFields: `created_at:between`,
        },
      ],
      fetchActivities,
      {
        getNextPageParam: () => queryKey,
      }
    )

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
    isLoading,
  }
}
