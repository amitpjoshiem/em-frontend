import { fetcher } from '@/api/fetcher/fetcher'

function createMonthlyExpenses({ id, data }) {
  return fetcher({
    url: `/monthly_expenses/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { createMonthlyExpenses }
