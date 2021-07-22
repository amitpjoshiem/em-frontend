import { ref } from 'vue'
import { useQuery } from 'vue-query'
import { UserFullInfo } from '../dto/UserFullInfo'
import { fetchMembersList } from './vueQuery/fetch-members'

export const useHouseholders = () => {
  let householdersType = ref('all')
  const { isLoading, isError, data, refetch } = useQuery(
    ['householders'],
    () => {
      return fetchMembersList({ queryKey: householdersType.value })
    },
    {
      select: (data) => {
        return data.data.map((houseHolder) => new UserFullInfo(houseHolder))
      },
    }
  )

  const changeHandler = (e) => {
    householdersType.value = e
    refetch.value()
  }

  return {
    isLoading,
    isError,
    data,
    houseHolderTypeHandler: changeHandler,
  }
}
