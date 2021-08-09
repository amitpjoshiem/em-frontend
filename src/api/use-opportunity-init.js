import { useQuery } from 'vue-query'
import { fetchOpportunityInit } from './vueQuery/fetch-opportunity-init'

export const useOpportunityInit = () => {
  const { isLoading, isError, data } = useQuery(['salesforce/init'], () => {
    return fetchOpportunityInit()
  })

  return {
    isLoading,
    isError,
    data,
  }
}
