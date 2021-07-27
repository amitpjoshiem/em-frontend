import { fetcher } from '@/api/fetcher/fetcher'

function fetchOpportunityList(id) {
  return fetcher({
    url: `/salesforce/member/${id}/opportunity`,
    options: { method: 'GET' },
  })
}

export { fetchOpportunityList }
