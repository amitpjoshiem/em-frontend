import { fetcher } from '@/api/fetcher/fetcher'

function sendClientReport({ data, member_id }) {
  return fetcher({
    url: `/client_reports/pdf/share/${member_id}`,
    data,
    options: { method: 'POST' },
  })
}

export { sendClientReport }
