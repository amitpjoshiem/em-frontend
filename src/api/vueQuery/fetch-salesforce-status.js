import { fetcher } from '@/api/fetcher/fetcher'

function fetchSalesforceStatus(id) {
  return fetcher({
    url: `/salesforce/status/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchSalesforceStatus }
