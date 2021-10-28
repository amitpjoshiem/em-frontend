import { fetcher } from '@/api/fetcher/fetcher'

function createMemberDetailsAssets({ id, data }) {
  return fetcher({
    url: `/asset_allocation/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { createMemberDetailsAssets }
