import { fetcher } from '@/api/fetcher/fetcher'

function fetchMembersList({ queryKey }) {
  const typeRaw = queryKey[1].reactiveType
  const limit = queryKey[1].reactiveLimit
  const orderBy = queryKey[1].reactiveOrderBy ? queryKey[1].reactiveOrderBy : undefined
  const sortedBy = queryKey[1].reactiveSortedBy ? queryKey[1].reactiveSortedBy : undefined
  const page = queryKey[1].reactivePage ? queryKey[1].reactivePage.page : ''
  let search = undefined

  if (typeRaw !== 'all') {
    search = `type:${typeRaw}`
  }

  return fetcher({
    url: `/members`,
    options: { method: 'GET', searchParams: { search, limit, page, orderBy, sortedBy } },
  })
}

export { fetchMembersList }
