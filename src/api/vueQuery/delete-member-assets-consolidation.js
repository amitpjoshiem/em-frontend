import { fetcher } from '@/api/fetcher/fetcher'

function deleteMemberAssetsConsolidation(id) {
  return fetcher({
    url: `/assets_consolidations/${id}`,
    options: { method: 'DELETE' },
  })
}

export { deleteMemberAssetsConsolidation }
