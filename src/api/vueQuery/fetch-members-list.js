import { fetcher } from '@/api/fetcher/fetcher'

function fetchMembersList({ queryKey }) {
  const type = queryKey[1].reactiveType
  const limit = queryKey[1].reactiveLimit
  const page = queryKey[1].reactivePage ? queryKey[1].reactivePage.page : ''

  return fetcher({
    url: `/members`,
    options: { method: 'GET', searchParams: { type, limit, page } },
  })
}

export { fetchMembersList }
