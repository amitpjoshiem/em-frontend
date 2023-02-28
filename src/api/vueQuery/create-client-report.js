import { fetcher } from '@/api/fetcher/fetcher'

function createClientReport({ id, data }) {
  return fetcher({
    url: `/client_reports/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { createClientReport }
