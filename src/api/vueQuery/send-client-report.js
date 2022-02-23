import { fetcher } from '@/api/fetcher/fetcher'

function sendClientReport({ data, doc_id }) {
  return fetcher({
    url: `/client_reports/share/${doc_id}`,
    data,
    options: { method: 'POST' },
  })
}

export { sendClientReport }
