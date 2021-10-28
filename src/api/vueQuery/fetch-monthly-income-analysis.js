import { fetcher } from '@/api/fetcher/fetcher'

function fetchMonthlyIncomeAnalysis(id) {
  return fetcher({
    url: `/blueprint/monthly_income/` + id,
    options: { method: 'GET' },
  })
}

export { fetchMonthlyIncomeAnalysis }
