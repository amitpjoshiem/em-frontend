import { fetcher } from '@/api/fetcher/fetcher'

function fetchStatsAdvisors() {
  return fetcher({
    url: `/stats/users`,
    options: { method: 'GET' },
  })
}

export { fetchStatsAdvisors }
