import { fetcher } from '@/api/fetcher/fetcher'

function fetchLogs({ pageParam, queryKey }) {
  const param = pageParam || queryKey
  const limit = param[1].reactiveLimit
  const page = param[1].reactivePage
  const user_id = param[1].reactiveId

  let search = undefined

  if (user_id) {
    search = `user_id:${user_id}`
  }

  return fetcher({
    url: `/logs`,
    options: { method: 'GET', searchParams: { limit, page, search } },
  })
}

export { fetchLogs }
