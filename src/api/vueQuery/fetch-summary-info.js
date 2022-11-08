import { fetcher } from '@/api/fetcher/fetcher'

function fetchSummaryInfo({ queryKey }) {
  const id = queryKey[1].reactiveId

  return fetcher({
    url: `/members/` + id + '?include=salesforce',
    options: { method: 'GET' },
  })
}

export { fetchSummaryInfo }
