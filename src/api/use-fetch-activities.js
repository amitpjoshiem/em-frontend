import { useInfiniteQuery } from 'vue-query'
import { fetchActivities } from './vueQuery/fetch-activities'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export const useFetchActivities = () => {
  const store = useStore()

  const loading = ref(false)
  const disabled = computed(() => loading.value)

  const limit = computed(() => store.state.activity.limit)
  const page = computed(() => store.state.activity.page)

  const queryKeySuffix = {
    reactiveLimit: limit.value,
    reactivePage: page.value,
  }

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage, status, isLoading } = useInfiniteQuery(
    ['activity', queryKeySuffix],
    fetchActivities,
    {
      cacheTime: 0,
      getNextPageParam: () => [
        'activity',
        {
          reactiveLimit: limit.value,
          reactivePage: page.value,
        },
      ],
    }
  )

  const load = async () => {
    loading.value = true
    store.commit('activity/setPage', page.value + 1)

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
  }
}
