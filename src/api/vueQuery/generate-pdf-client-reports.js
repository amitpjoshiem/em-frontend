import { fetcher } from '@/api/fetcher/fetcher'

function generatePdfClientReports({ id, data }) {
  return fetcher({
    url: `/client_reports/pdf/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { generatePdfClientReports }
