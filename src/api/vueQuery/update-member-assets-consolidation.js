import { fetcher } from '@/api/fetcher/fetcher'

function updateMemberAssetsConsolidation(data) {
  const { form, id } = data
  return fetcher({
    url: `/assets_consolidations/${id}`,
    data: form,
    options: { method: 'PATCH' },
  })
}

export { updateMemberAssetsConsolidation }
