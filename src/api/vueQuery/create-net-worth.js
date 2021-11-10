import { fetcher } from '@/api/fetcher/fetcher'

function createNetWorth({ id, data }) {
  return fetcher({
    url: `/blueprint/networth/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { createNetWorth }
