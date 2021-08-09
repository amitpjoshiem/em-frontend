import { fetcher } from '@/api/fetcher/fetcher'

function fetchOpportunityList(id) {
  return fetcher({
    url: `/salesforce/child_opportunity/all/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchOpportunityList }
