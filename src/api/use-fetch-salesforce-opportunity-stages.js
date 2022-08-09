import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchSalesforceOpportunityStages } from './vueQuery/fetch-salesforce-opportunity-stages'

export const useFetchSalesforceOpportunityStages = () => {
  const queryKey = reactive(['salesforce-opportunity-stages'])

  const query = useQuery(queryKey, {
    queryFn: fetchSalesforceOpportunityStages,
  })

  return {
    ...query,
  }
}
