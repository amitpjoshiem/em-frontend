import { fetcher } from '@/api/fetcher/fetcher'

function fetchDeleteInvestmentPackage(id) {
  return fetcher({
    url: `/investment_package/${id}`,
    options: { method: 'DELETE' },
  })
}

export { fetchDeleteInvestmentPackage }
