import { fetcher } from '@/api/fetcher/fetcher'

function fetchMembersList({ queryKey }) {
  const typeRaw = queryKey[1].reactiveType
  const includeRaw = queryKey[1].reactiveInclude
  const limit = queryKey[1].reactiveLimit
  const orderBy = queryKey[1].reactiveOrderBy ? queryKey[1].reactiveOrderBy : undefined
  const sortedBy = queryKey[1].reactiveSortedBy ? queryKey[1].reactiveSortedBy : undefined
  const page = queryKey[1].reactivePage ? queryKey[1].reactivePage.page : ''
  const status = queryKey[1].reactiveStatus ? queryKey[1].reactiveStatus : ''
  const owner = queryKey[1].reactiveOnlyMyMember ? queryKey[1].reactiveOnlyMyMember : ''
  const owner_id = queryKey[1].reactiveOwnerIdMember ? queryKey[1].reactiveOwnerIdMember : ''

  let search = undefined
  let include = undefined

  if (typeRaw !== 'all') {
    search = `type:${typeRaw}`
  }

  if (includeRaw) {
    include = includeRaw
  }

  const searchParams = {
    search,
    include,
    limit,
    page,
    orderBy,
    sortedBy,
    owner,
    owner_id,
  }

  if (status) searchParams.status = status

  return fetcher({
    url: `/members`,
    options: { method: 'GET', searchParams },
  })
}

export { fetchMembersList }
