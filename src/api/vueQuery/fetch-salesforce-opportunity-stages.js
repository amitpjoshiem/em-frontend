import { fetcher } from '@/api/fetcher/fetcher'

function fetchSalesforceOpportunityStages() {
  return fetcher({
    url: `/salesforce/opportunity/stages`,
    options: { method: 'GET' },
  })
}

export { fetchSalesforceOpportunityStages }
