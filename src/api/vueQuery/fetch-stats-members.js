import { fetcher } from '@/api/fetcher/fetcher'

function fetchStatsMembers() {
  return fetcher({
    url: `/stats/members`,
    options: { method: 'GET' },
  })
}

export { fetchStatsMembers }
