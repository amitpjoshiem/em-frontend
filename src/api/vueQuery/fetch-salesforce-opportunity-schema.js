import { fetcher } from '@/api/fetcher/fetcher'

function fetchSalesforceOpportunitySchema({ queryKey }) {
  console.log('queryKey - ', queryKey)
  const stage = queryKey[1].reactiveStage

  return fetcher({
    url: `/salesforce/opportunity/schema/stage/${stage}`,
    options: { method: 'GET' },
  })
}

export { fetchSalesforceOpportunitySchema }
