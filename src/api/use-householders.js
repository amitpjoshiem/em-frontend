import { useQuery } from 'vue-query'
import { UserFullInfo } from '../dto/UserFullInfo'
import { fetchMembersList } from './vueQuery/fetch-members'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export const useHouseholders = () => {
  const store = useStore()

  const houseHolderType = computed(() => {
    return store.state.dashboard.houseHolderType
  })

  const limit = computed(
    () => store.state.globalComponents.itemsPerPage.values.dashboard
  )

  const { isFetching, isLoading, isError, data, refetch } = useQuery(
    ['householders'],
    () => {
      return fetchMembersList({
        type: houseHolderType.value,
        limit: limit.value,
      })
    },
    {
      select: (data) => {
        return data.data.map((houseHolder) => new UserFullInfo(houseHolder))
      },
    }
  )

  watch(houseHolderType, (newValue, oldValue) => {
    if (newValue !== oldValue) refetch.value()
  })

  watch(limit, (newValue, oldValue) => {
    if (newValue !== oldValue) refetch.value()
  })

  return {
    isFetching,
    isLoading,
    isError,
    data,
  }
}
