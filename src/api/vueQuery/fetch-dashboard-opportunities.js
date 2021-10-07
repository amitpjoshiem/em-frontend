import { fetcher } from '@/api/fetcher/fetcher'

function fetchDashboardOpportunities({ queryKey }) {
  const type = queryKey[1].reactiveType

  return fetcher({
    url: `/dashboard/opportunity`,
    options: { method: 'GET', searchParams: { type } },
  })
}

export { fetchDashboardOpportunities }
