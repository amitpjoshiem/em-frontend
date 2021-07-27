import { useQuery } from 'vue-query'
import { fetchOpportunityList } from './vueQuery/fetch-opportunity-list'

export const useOpportunityList = (id) => {
  const { isLoading, isError, data } = useQuery(
    ['opportunityList', id],
    () => {
      return fetchOpportunityList(id)
    },
    {
      select: (data) => {
        return data.data
      },
    }
  )

  return {
    isLoading,
    isError,
    data,
  }
}
