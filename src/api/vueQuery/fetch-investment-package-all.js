import { fetcher } from '@/api/fetcher/fetcher'

function fetchInvestmentPackageAll({ queryKey }) {
  const id = queryKey[1]

  return fetcher({
    url: `/investment_package/all/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchInvestmentPackageAll }
