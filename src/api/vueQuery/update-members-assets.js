import { fetcher } from '@/api/fetcher/fetcher'

function updateMembersAssets({ data, id }) {
  return fetcher({
    url: `/assets_income/data/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { updateMembersAssets }
