import { fetcher } from '@/api/fetcher/fetcher'

function generateExcelClientReports({ id, data }) {
  return fetcher({
    url: `/client_reports/excel/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { generateExcelClientReports }
