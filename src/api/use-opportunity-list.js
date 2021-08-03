import { useQuery } from 'vue-query'
import { fetchOpportunityList } from '@/api/vueQuery/fetch-opportunity-list'
import { OpportunityList } from '@/dto/OpportunityList'

export const useOpportunityList = (id) => {
  const { isLoading, isError, data } = useQuery(
    ['opportunityList', id],
    () => {
      return fetchOpportunityList(id)
    },
    {
      select: (data) => {
        return data.data.map((opportunity) => new OpportunityList(opportunity))
      },
    }
  )

  return {
    isLoading,
    isError,
    data,
  }
}
