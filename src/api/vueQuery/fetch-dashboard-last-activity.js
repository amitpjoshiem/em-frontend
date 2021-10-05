import { fetcher } from '@/api/fetcher/fetcher'

function fetchDashboardLastActivity() {
  return fetcher({
    url: `/activities?orderBy=created_at&sortedBy=desc&limit=3`,
    options: { method: 'GET' },
  })
}

export { fetchDashboardLastActivity }
