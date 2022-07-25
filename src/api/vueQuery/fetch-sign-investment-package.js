import { fetcher } from '@/api/fetcher/fetcher'

function fetchSignInvestmentPackage(id) {
  return fetcher({
    url: `/investment_package/sign/${id}`,
    options: { method: 'POST' },
  })
}

export { fetchSignInvestmentPackage }
