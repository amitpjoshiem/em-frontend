import { fetcher } from '@/api/fetcher/fetcher'

function checkCreateAssetsIncomeField({ id, data }) {
  return fetcher({
    url: `/assets_income/check/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { checkCreateAssetsIncomeField }
