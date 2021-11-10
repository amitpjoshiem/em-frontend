import { fetcher } from '@/api/fetcher/fetcher'

function fetchNetWorth(id) {
  return fetcher({
    url: `/blueprint/networth/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchNetWorth }
