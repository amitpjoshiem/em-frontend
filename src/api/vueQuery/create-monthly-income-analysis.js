import { fetcher } from '@/api/fetcher/fetcher'

function createMonthlyIncomeAnalysis({ id, data }) {
  return fetcher({
    url: `/blueprint/monthly_income/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { createMonthlyIncomeAnalysis }
