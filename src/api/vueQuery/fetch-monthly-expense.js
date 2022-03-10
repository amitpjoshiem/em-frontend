import { fetcher } from '@/api/fetcher/fetcher'

function fetchMonthlyExpense({ queryKey }) {
  const id = queryKey[0][1]

  return fetcher({
    url: `/monthly_expenses/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchMonthlyExpense }
