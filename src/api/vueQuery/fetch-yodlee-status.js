import { fetcher } from '@/api/fetcher/fetcher'

function fetchYodleeStatus(id) {
  return fetcher({
    url: `/yodlee/${id}/status`,
    options: { method: 'GET' },
  })
}

export { fetchYodleeStatus }
