import { fetcher } from '@/api/fetcher/fetcher'

function fetchTaxQualificationInit() {
  return fetcher({
    url: `/fixed_index_annuities/init`,
    options: { method: 'GET' },
  })
}

export { fetchTaxQualificationInit }
