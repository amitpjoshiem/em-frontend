import { fetcher } from '@/api/fetcher/fetcher'

function fetchRevenueDashboardLeadCreated({ queryKey }) {
  const type = queryKey[1].reactiveType

  return fetcher({
    url: `/pipeline/lead/created`,
    options: { method: 'GET', searchParams: { type } },
  })
}

export { fetchRevenueDashboardLeadCreated }
