import { fetcher } from '@/api/fetcher/fetcher'

function fetchMembersList({ queryKey }) {
  const type = queryKey[1].reactiveType
  const limit = queryKey[1].reactiveLimit

  return fetcher({
    url: `/members`,
    options: { method: 'GET', searchParams: { type, limit } },
  })
}

export { fetchMembersList }
