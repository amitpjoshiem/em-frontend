import { fetcher } from '@/api/fetcher/fetcher'

function createInvestmentPackage({ id, data }) {
  return fetcher({
    url: `/investment_package/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { createInvestmentPackage }
