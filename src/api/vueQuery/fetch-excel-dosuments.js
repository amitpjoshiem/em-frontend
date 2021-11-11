import { fetcher } from '@/api/fetcher/fetcher'

function fetchExcelDocuments() {
  return fetcher({
    url: `/assets_consolidations/export/excel?orderBy=created_at&sortedBy=desc`,
    options: { method: 'GET' },
  })
}

export { fetchExcelDocuments }
