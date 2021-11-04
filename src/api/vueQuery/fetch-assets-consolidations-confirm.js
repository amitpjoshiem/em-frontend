import { fetcher } from '@/api/fetcher/fetcher'

function fetchAssetsConsolidationsConfirm(id) {
  return fetcher({
    url: `/assets_consolidations/${id}/confirm`,
    options: { method: 'POST' },
  })
}

export { fetchAssetsConsolidationsConfirm }
