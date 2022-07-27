import { useQuery } from 'vue-query'
import { reactive, ref } from 'vue'
import { fetchSalesforceOpportunitySchema } from './vueQuery/fetch-salesforce-opportunity-schema'

export const useFetchSalesforceOpportunitySchema = (stage, options = {}) => {
  const reactiveStage = ref(stage)

  const queryKey = reactive([
    'salesforce-opportunity-schema',
    {
      reactiveStage,
    },
  ])

  const query = useQuery(queryKey, {
    queryFn: fetchSalesforceOpportunitySchema,
    ...options,
  })

  return {
    ...query,
  }
}
