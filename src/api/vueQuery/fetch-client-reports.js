import { fetcher } from '@/api/fetcher/fetcher'

function fetchClientReports(id) {
  return fetcher({
    url: `/client_reports/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchClientReports }
