import { useQuery } from 'vue-query'
import { fetchMemberDetailsAssets } from './vueQuery/fetch-member-details-assets'
import { MemberAssets } from '../dto/MemberAssets'

export const useFetchMemberDetailsAssets = (id) => {
  const { isLoading, isFetching, isError, data } = useQuery(
    ['member/assetAllocation', id],
    () => {
      return fetchMemberDetailsAssets(id)
    },
    {
      select: (data) => {
        return new MemberAssets(data.data)
      },
    }
  )

  return {
    isLoading,
    isFetching,
    isError,
    data,
  }
}
