import { fetcher } from '@/api/fetcher/fetcher'

function fetchClientReport(id) {
  return fetcher({
    url: `/client_reports/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchClientReport }
