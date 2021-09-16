import { fetcher } from '@/api/fetcher/fetcher'

function sendReport(data) {
  return fetcher({
    url: `/members/report`,
    data,
    options: { method: 'POST' },
  })
}

export { sendReport }
