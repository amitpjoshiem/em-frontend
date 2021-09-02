import { fetcher } from '@/api/fetcher/fetcher'

function updateMembersAssets(data) {
  return fetcher({
    url: `/assets_income`,
    data,
    options: { method: 'PATCH' },
  })
}

export { updateMembersAssets }
