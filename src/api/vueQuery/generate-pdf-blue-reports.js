import { fetcher } from '@/api/fetcher/fetcher'

function generatePdfBlueReports({ id, data }) {
  return fetcher({
    url: `/blueprint/pdf/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { generatePdfBlueReports }
