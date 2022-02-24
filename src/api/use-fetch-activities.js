import { useInfiniteQuery } from 'vue-query'
import { fetchActivities } from './vueQuery/fetch-activities'
import { ref, computed } from 'vue'

const activity = {
  limit: 10,
  page: 1,
}

export const useFetchActivities = () => {
  const loading = ref(false)
  const disabled = computed(() => loading.value)

  const queryKeySuffix = {
    reactiveLimit: activity.limit,
    reactivePage: activity.page,
  }

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage, status, isLoading } = useInfiniteQuery(
    ['activity', queryKeySuffix],
    fetchActivities,
    {
      cacheTime: 0,
      getNextPageParam: () => [
        'activity',
        {
          reactiveLimit: activity.limit,
          reactivePage: activity.page,
        },
      ],
    }
  )

  const load = async () => {
    loading.value = true
    activity.page = activity.page + 1

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
