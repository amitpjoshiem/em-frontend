import { fetcher } from '@/api/fetcher/fetcher'

function fetchExcelDocuments(id) {
  return fetcher({
    url: `/assets_consolidations/${id}/export/excel?orderBy=created_at&sortedBy=desc`,
    options: { method: 'GET' },
  })
}

export { fetchExcelDocuments }
