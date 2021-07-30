import { fetcher } from '@/api/fetcher/fetcher'

function fetchMembersList(queryKey) {
  const { type, limit } = queryKey
  return fetcher({
    url: `/members`,
    options: { method: 'GET', searchParams: { type, limit } },
  })
}

export { fetchMembersList }
