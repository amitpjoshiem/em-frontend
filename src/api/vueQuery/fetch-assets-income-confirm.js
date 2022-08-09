import { fetcher } from '@/api/fetcher/fetcher'

function fetchAssetsIncomeConfirm(id) {
  return fetcher({
    url: `/assets_income/confirm/${id}`,
    options: { method: 'POST' },
  })
}

export { fetchAssetsIncomeConfirm }
