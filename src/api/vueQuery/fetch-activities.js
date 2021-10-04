import { fetcher } from '@/api/fetcher/fetcher'

function fetchActivities({ queryKey }) {
  const limit = queryKey[1].reactiveLimit
  const searchFields = queryKey[1].reactiveSearchFields
  const search = queryKey[1].reactiveSearch

  return fetcher({
    url: `/activities`,
    options: { method: 'GET', searchParams: { limit, searchFields, search } },
  })
}

export { fetchActivities }
