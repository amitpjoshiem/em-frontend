import { fetcher } from '@/api/fetcher/fetcher'

function createAssetssConsolidationsExcel(id) {
  return fetcher({
    url: `/assets_consolidations/${id}/export/excel`,
    options: { method: 'POST' },
  })
}

export { createAssetssConsolidationsExcel }
