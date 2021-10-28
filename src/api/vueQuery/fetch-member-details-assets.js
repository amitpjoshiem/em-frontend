import { fetcher } from '@/api/fetcher/fetcher'

function fetchMemberDetailsAssets(id) {
  return fetcher({
    url: `/asset_allocation/` + id,
    options: { method: 'GET' },
  })
}

export { fetchMemberDetailsAssets }
