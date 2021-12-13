import { fetcher } from '@/api/fetcher/fetcher'

function createSalesforceAccount(data) {
  return fetcher({
    url: `/salesforce/account`,
    data,
    options: { method: 'POST' },
  })
}

export { createSalesforceAccount }
