import { fetcher } from '@/api/fetcher/fetcher'

function fetchClientReportsAll(id) {
  return fetcher({
    url: `/client_reports/all/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchClientReportsAll }
