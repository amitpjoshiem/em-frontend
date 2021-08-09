import { fetcher } from '@/api/fetcher/fetcher'

function fetchOpportunityInit() {
  return fetcher({
    url: `/salesforce/child_opportunity/init`,
    options: { method: 'GET' },
  })
}

export { fetchOpportunityInit }
