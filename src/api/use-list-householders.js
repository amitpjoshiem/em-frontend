import { useQuery } from 'vue-query'
import { UserFullInfo } from '../dto/UserFullInfo'
import { fetchMembersList } from './vueQuery/fetch-members'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export const useListHouseholders = (type) => {
  const store = useStore()

  const limit = computed(
    () => store.state.globalComponents.itemsPerPage.values.listOfHouseholds
  )

  const { isFetching, isLoading, isError, data, refetch } = useQuery(
    ['householders'],
    () => {
      return fetchMembersList({ type, limit: limit.value })
    },
    {
      select: (data) => {
        return data.data.map((houseHolder) => new UserFullInfo(houseHolder))
      },
    }
  )

  watch(limit, (newValue, oldValue) => {
    if (newValue !== oldValue) refetch.value()
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
  }
}
