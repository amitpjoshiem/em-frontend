import { fetcher } from '@/api/fetcher/fetcher'

function createAssetsConsolidationTables({ id, form }) {
  return fetcher({
    url: `/assets_consolidations/table/${id}`,
    data: form,
    options: { method: 'PATCH' },
  })
}

export { createAssetsConsolidationTables }
