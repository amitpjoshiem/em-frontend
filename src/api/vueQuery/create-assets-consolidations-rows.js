import { fetcher } from '@/api/fetcher/fetcher'

function createAssetsConsolidationRows({ memberId, tableId }) {
  return fetcher({
    url: `/assets_consolidations/${memberId}/${tableId}`,
    options: { method: 'POST' },
  })
}

export { createAssetsConsolidationRows }
