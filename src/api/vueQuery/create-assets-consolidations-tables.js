import { fetcher } from '@/api/fetcher/fetcher'

function createAssetsConsolidationTables(memberId) {
  return fetcher({
    url: `/assets_consolidations/table/${memberId}`,
    options: { method: 'PATCH' },
  })
}

export { createAssetsConsolidationTables }
