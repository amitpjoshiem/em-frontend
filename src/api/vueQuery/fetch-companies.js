import { fetcher } from '@/api/fetcher/fetcher'

function fetchCompanies() {
  return fetcher({
    url: `/companies`,
    options: { method: 'GET' },
  })
}

export { fetchCompanies }
