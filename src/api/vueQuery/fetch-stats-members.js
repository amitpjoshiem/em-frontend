import { fetcher } from '@/api/fetcher/fetcher'

function fetchStatsMembers({ queryKey }) {
  const typeRaw = queryKey[1].reactiveType
  let search = undefined

  if (typeRaw) {
    search = `type:${typeRaw}`
  }

  return fetcher({
    url: `/stats/members`,
    options: { method: 'GET', searchParams: { search } },
  })
}

export { fetchStatsMembers }
