import { fetcher } from '@/api/fetcher/fetcher'

function createMemberAssetsConsolidation(id) {
  return fetcher({
    url: `/assets_consolidations/${id}`,
    options: { method: 'POST' },
  })
}

export { createMemberAssetsConsolidation }
