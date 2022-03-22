import { fetcher } from '@/api/fetcher/fetcher'

function putMemberAssetsConsolidation(data) {
  const { form, id } = data
  return fetcher({
    url: `/assets_consolidations/table/${id}`,
    data: form,
    options: { method: 'PUT' },
  })
}

export { putMemberAssetsConsolidation }
