import { useQuery } from 'vue-query'
import { fetchStageOpportunity } from './vueQuery/fetch-stage-opportunity'

export const useStageOpportunity = () => {
  const { isLoading, isError, data } = useQuery(['salesforce/stage'], () => {
    return fetchStageOpportunity()
  })

  return {
    isLoading,
    isError,
    data,
  }
}
