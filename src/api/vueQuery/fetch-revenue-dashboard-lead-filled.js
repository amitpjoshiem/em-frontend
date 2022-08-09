import { fetcher } from '@/api/fetcher/fetcher'

function fetchRevenueDashboardLeadFilled({ queryKey }) {
  const type = queryKey[1].reactiveType

  return fetcher({
    url: `/pipeline/lead/input`,
    options: { method: 'GET', searchParams: { type } },
  })
}

export { fetchRevenueDashboardLeadFilled }
