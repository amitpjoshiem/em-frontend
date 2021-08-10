import { fetcher } from '@/api/fetcher/fetcher'

function createOpportunity(data) {
  return fetcher({
    url: `/salesforce/child_opportunity`,
    data,
    options: { method: 'POST' },
  })
}

export { createOpportunity }
