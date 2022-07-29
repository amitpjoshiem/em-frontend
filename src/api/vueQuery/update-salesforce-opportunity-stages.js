import { fetcher } from '@/api/fetcher/fetcher'

function updateSalesforceOpportunityStages({ id, form }) {
  return fetcher({
    url: `/salesforce/opportunity/stage/${id}`,
    data: form,
    options: { method: 'PATCH' },
  })
}

export { updateSalesforceOpportunityStages }
