import { fetcher } from '@/api/fetcher/fetcher'

function fetchRevenueDashboardLeadClosed({ queryKey }) {
  const type = queryKey[1].reactiveType

  return fetcher({
    url: `/pipeline/closed_win_lost`,
    options: { method: 'GET', searchParams: { type } },
  })
}

export { fetchRevenueDashboardLeadClosed }
