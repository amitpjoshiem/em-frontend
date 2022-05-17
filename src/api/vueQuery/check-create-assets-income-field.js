import { fetcher } from '@/api/fetcher/fetcher'

function checkCreateAssetsIncomeField({ memberId, data }) {
  return fetcher({
    url: `/assets_income/check/${memberId}`,
    data,
    options: { method: 'POST' },
  })
}

export { checkCreateAssetsIncomeField }
