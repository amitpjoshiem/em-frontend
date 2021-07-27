import { fetcher } from '@/api/fetcher/fetcher'

function createOpportunity(data) {
  return fetcher({
    url: `/salesforce/opportunity`,
    data,
    options: { method: 'POST' },
  })
}

export { createOpportunity }
