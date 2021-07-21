import { fetcher } from '@/api/fetcher/fetcher'

function createMembers(data) {
  return fetcher({
    url: `/members`,
    data,
    options: { method: 'POST' },
  })()
}

export { createMembers }
