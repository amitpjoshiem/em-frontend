import { useInfiniteQuery } from 'vue-query'
import { fetchActivities } from './vueQuery/fetch-activities'
import { reactive, ref, computed } from 'vue'
import dayjs from 'dayjs'

const activity = {
  limit: 0,
  searchFields: `created_at:between`,
}

function getPreviousDate(date) {
  console.log()
  return dayjs(date).subtract(7, 'day').format('YYYY-MM-DD')
}

function getSearch(previousDate, currentDate) {
  return `created_at:` + previousDate + ',' + currentDate
}

function getCurrentDate() {
  return dayjs()
    .add(dayjs.duration({ days: 1 }))
    .format('YYYY-MM-DD')
}

function getInitialState() {
  const currentDate = getCurrentDate()
  const previousDate = getPreviousDate(currentDate)
  const search = getSearch(previousDate, currentDate)

  return { currentDate, previousDate, search, ...activity }
}

function getNextState(currentDate) {
  const previousDate = getPreviousDate(currentDate)

  const search = getSearch(previousDate, currentDate)

  return { currentDate, previousDate, search, ...activity }
}

export const useFetchActivities = () => {
  const state = reactive(getInitialState())
  const loading = ref(false)
  const disabled = computed(() => loading.value)

  const queryKeySuffix = {
    reactiveSearch: state.search,
    reactiveLimit: state.limit,
    reactiveSearchFields: state.searchFields,
  }

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, refetch, isLoading } =
    useInfiniteQuery(['activity', queryKeySuffix], fetchActivities, {
      getNextPageParam: () => [
        'activity',
        {
          reactiveSearch: state.search,
          reactiveLimit: state.limit,
          reactiveSearchFields: state.searchFields,
        },
      ],
    })

  const load = async () => {
    loading.value = true
    const nextState = getNextState(state.previousDate)
    Object.assign(state, nextState)
    fetchNextPage.value().then(() => {
      loading.value = false
    })
  }

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
    load,
    disabled,
    loading,
  }
}
