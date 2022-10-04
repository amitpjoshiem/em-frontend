import { fetcher } from '@/api/fetcher/fetcher'

function fetchStatsMembers({ queryKey }) {
  const typeRaw = queryKey[1].reactiveType
  const owner = queryKey[1].reactiveOnlyMyMember ? queryKey[1].reactiveOnlyMyMember : ''
  const owner_id = queryKey[1].reactiveOwnerIdMember ? queryKey[1].reactiveOwnerIdMember : ''

  let search = undefined

  if (typeRaw) {
    search = `type:${typeRaw}`
  }

  const searchParams = {
    search,
    owner,
    owner_id,
  }

  return fetcher({
    url: `/stats/members`,
    options: { method: 'GET', searchParams },
  })
}

export { fetchStatsMembers }
