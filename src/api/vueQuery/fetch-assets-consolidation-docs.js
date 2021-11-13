import { fetcher } from '@/api/fetcher/fetcher'

function fetchAssetsConsolidationDocs(id) {
  return fetcher({
    url: `/assets_consolidations/${id}/docs/`,
    options: { method: 'GET' },
  })
}

export { fetchAssetsConsolidationDocs }
