import { fetcher } from '@/api/fetcher/fetcher'

function fetchMembersSearch({ queryKey }) {
  const searchRaw = queryKey[1].reactiveSearch
  const search = `name:${searchRaw}`

  return fetcher({
    url: `/members`,
    options: { method: 'GET', searchParams: { type: 'all', search } },
  })
}

export { fetchMembersSearch }
