import { fetcher } from '@/api/fetcher/fetcher'

function createConcernsBlueReport({ id, data }) {
  return fetcher({
    url: `/blueprint/concern/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { createConcernsBlueReport }
