import { fetcher } from '@/api/fetcher/fetcher'

function createAssetsIncomeRow({ id, data }) {
  return fetcher({
    url: `/assets_income/row/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { createAssetsIncomeRow }
