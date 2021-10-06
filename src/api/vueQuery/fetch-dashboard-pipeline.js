import { fetcher } from '@/api/fetcher/fetcher'

function fetchDashboardPipeLine({ queryKey }) {
  const type = queryKey[1].reactiveType

  return fetcher({
    url: `/dashboard/pipeline`,
    options: { method: 'GET', searchParams: { type } },
  })
}

export { fetchDashboardPipeLine }
