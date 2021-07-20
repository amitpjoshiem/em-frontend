import { fetcher } from '@/api/fetcher/fetcher'

function fetchMembersList({ queryKey }) {
  const type = queryKey[1].type
  return fetcher({
    url: `/members`,
    options: { method: 'GET', searchParams: { type } },
  })
}

export { fetchMembersList }
