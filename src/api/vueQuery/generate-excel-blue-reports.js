import { fetcher } from '@/api/fetcher/fetcher'

function generateExcelBlueReports({ id, data }) {
  return fetcher({
    url: `/blueprint/excel/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { generateExcelBlueReports }
