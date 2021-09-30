import { fetcher } from '@/api/fetcher/fetcher'

function fetchActivities() {
  return fetcher({
    url: `/activities`,
    options: { method: 'GET' },
  })
}

export { fetchActivities }
