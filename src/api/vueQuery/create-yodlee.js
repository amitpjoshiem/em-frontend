import { fetcher } from '@/api/fetcher/fetcher'

function createYodlee(id) {
  return fetcher({
    url: `/yodlee/${id}`,
    options: { method: 'POST' },
  })
}

export { createYodlee }
