import { fetcher } from '@/api/fetcher/fetcher'

function createYodleeAcc(id) {
  return fetcher({
    url: `/yodlee/${id}`,
    options: { method: 'POST' },
  })
}

export { createYodleeAcc }
