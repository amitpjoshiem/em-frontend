import { fetcher } from '@/api/fetcher/fetcher'

function deleteAssetsIncomeRow({ id, data }) {
  return fetcher({
    url: `/assets_income/delete/${id}`,
    data,
    options: { method: 'DELETE' },
  })
}

export { deleteAssetsIncomeRow }
