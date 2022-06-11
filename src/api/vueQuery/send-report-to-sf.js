import { fetcher } from '@/api/fetcher/fetcher'

function sendReportToSf({ data, id }) {
  return fetcher({
    url: `/salesforce/account/upload/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { sendReportToSf }
