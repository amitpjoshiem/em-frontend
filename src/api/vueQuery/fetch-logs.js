import { fetcher } from '@/api/fetcher/fetcher'

function fetchLogs({ pageParam, queryKey }) {
  const param = pageParam || queryKey
  const limit = param[1].reactiveLimit
  const page = param[1].reactivePage

  return fetcher({
    url: `/logs`,
    options: { method: 'GET', searchParams: { limit, page } },
  })
}

export { fetchLogs }
