import { fetcher } from '@/api/fetcher/fetcher'

function updateStepAssetsIncome(id) {
  return fetcher({
    url: `/assets_income/confirm/${id}`,
    options: { method: 'POST' },
  })
}

export { updateStepAssetsIncome }
