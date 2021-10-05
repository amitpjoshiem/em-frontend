import { fetcher } from '@/api/fetcher/fetcher'

function fetchActivities({ pageParam, queryKey }) {
  const param = pageParam || queryKey
  const limit = param[1].reactiveLimit
  const searchFields = param[1].reactiveSearchFields
  const search = param[1].reactiveSearch

  return fetcher({
    url: `/activities`,
    options: { method: 'GET', searchParams: { limit, searchFields, search } },
  })
}

export { fetchActivities }
