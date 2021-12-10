import { fetcher } from '@/api/fetcher/fetcher'

function fetchSalesforceAccount(id) {
  return fetcher({
    url: `/salesforce/account/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchSalesforceAccount }
