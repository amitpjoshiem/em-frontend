import { fetcher } from '@/api/fetcher/fetcher'

function fetchSalesForceAuth() {
  return fetcher({
    url: `/salesforce/auth/settings`,
    options: { method: 'GET' },
  })
}

export { fetchSalesForceAuth }
