import { fetcher } from '@/api/fetcher/fetcher'

function createAssetsIncome(data) {
  return fetcher({
    url: `/assets_income`,
    data,
    options: { method: 'POST' },
  })
}

export { createAssetsIncome }
