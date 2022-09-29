import { fetcher } from '@/api/fetcher/fetcher'

function createChildOpportunity(data) {
  return fetcher({
    url: `/salesforce/child_opportunity`,
    data,
    options: { method: 'POST' },
  })
}

export { createChildOpportunity }
