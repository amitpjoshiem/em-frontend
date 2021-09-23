import { fetcher } from '@/api/fetcher/fetcher'

function fetchMembersList({ queryKey }) {
  const typeRaw = queryKey[1].reactiveType
  const limit = queryKey[1].reactiveLimit
  const page = queryKey[1].reactivePage ? queryKey[1].reactivePage.page : ''
  let search = undefined

  if (typeRaw !== 'all') {
    search = `type:${typeRaw}`
  }

  return fetcher({
    url: `/members`,
    options: { method: 'GET', searchParams: { search, limit, page } },
  })
}

export { fetchMembersList }
