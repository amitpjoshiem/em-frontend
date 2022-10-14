import { fetcher } from '@/api/fetcher/fetcher'

function fetchChildOpportunityById({ queryKey }) {
  const id = queryKey[1].reactiveId
  return fetcher({
    url: `/salesforce/child_opportunity/find/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchChildOpportunityById }
