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

  const { isLoading, isError, data, refetch } = useQuery(
    ['householders'],
    () => {
      return fetchMembersList({ queryKey: houseHolderType.value })
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

  return {
    isLoading,
    isError,
    data,
  }
}
