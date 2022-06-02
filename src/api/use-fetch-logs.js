import { useInfiniteQuery } from 'vue-query'
import { fetchLogs } from './vueQuery/fetch-logs'
import { ref, computed, reactive } from 'vue'
import { useStore } from 'vuex'

export const useFetchLogs = () => {
  const store = useStore()

  const loading = ref(false)
  const disabled = computed(() => loading.value)

  const limit = computed(() => store.state.logs.limit)
  const page = computed(() => store.state.logs.page)
  const userId = computed(() => store.state.logs.id)

  const reactiveId = ref(userId)

  const queryKeySuffix = reactive({
    reactiveLimit: limit.value,
    reactivePage: page.value,
    reactiveId,
  })

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage, status, isLoading, refetch } = useInfiniteQuery(
    ['logs', queryKeySuffix],
    fetchLogs,
    {
      cacheTime: 0,
      getNextPageParam: () => [
        'logs',
        {
          reactiveLimit: limit.value,
          reactivePage: page.value,
          reactiveId: userId.value,
        },
      ],
    }
  )

  const load = async () => {
    loading.value = true
    store.commit('logs/setPage', page.value + 1)

    const lastPage = data.value.pages.length - 1
    const current_page = data.value.pages[lastPage].meta.pagination.current_page
    const total_pages = data.value.pages[lastPage].meta.pagination.total_pages

    if (current_page < total_pages) {
      fetchNextPage.value().then(() => {
        loading.value = false
      })
    }
  }

  return {
    data,
    error,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
    load,
    disabled,
    loading,

    refetch,
  }
}
