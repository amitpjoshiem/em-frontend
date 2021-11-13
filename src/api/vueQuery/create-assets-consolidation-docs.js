import { fetcher } from '@/api/fetcher/fetcher'

function createAssetsConsolidationDocs({ id, data }) {
  return fetcher({
    url: `/assets_consolidations/${id}/upload`,
    data,
    options: { method: 'POST' },
  })
}

export { createAssetsConsolidationDocs }
