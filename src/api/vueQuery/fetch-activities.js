import { fetcher } from '@/api/fetcher/fetcher'

function fetchActivities({ pageParam, queryKey }) {
  const param = pageParam || queryKey
  const limit = param[1].reactiveLimit
  const page = param[1].reactivePage

  // console.log('limit - ', limit)
  // console.log('page - ', page)

  return fetcher({
    url: `/activities`,
    options: { method: 'GET', searchParams: { limit, page } },
  })
}

export { fetchActivities }
