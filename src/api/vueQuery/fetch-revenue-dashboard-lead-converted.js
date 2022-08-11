import { fetcher } from '@/api/fetcher/fetcher'

function fetchRevenueDashboardLeadConverted({ queryKey }) {
  const type = queryKey[1].reactiveType

  return fetcher({
    url: `/pipeline/lead/converted`,
    options: { method: 'GET', searchParams: { type } },
  })
}

export { fetchRevenueDashboardLeadConverted }
