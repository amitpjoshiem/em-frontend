import { fetcher } from '@/api/fetcher/fetcher'

function fetchYodleeProviders(id) {
  return fetcher({
    url: `/yodlee/${id}/providers`,
    options: { method: 'GET' },
  })
}

export { fetchYodleeProviders }
