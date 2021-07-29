import { useQuery } from 'vue-query'
import { UserFullInfo } from '../dto/UserFullInfo'
import { fetchMembersList } from './vueQuery/fetch-members'

export const useListHouseholders = (type) => {
  const { isLoading, isError, data } = useQuery(
    ['householders'],
    () => {
      return fetchMembersList({ queryKey: type })
    },
    {
      select: (data) => {
        return data.data.map((houseHolder) => new UserFullInfo(houseHolder))
      },
    }
  )

  return {
    isLoading,
    isError,
    data,
  }
}
