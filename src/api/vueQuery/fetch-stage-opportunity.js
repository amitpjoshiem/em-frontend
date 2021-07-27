import { fetcher } from '@/api/fetcher/fetcher'

function fetchStageOpportunity() {
  return fetcher({
    url: `/salesforce/stage`,
    options: { method: 'GET' },
  })
}

export { fetchStageOpportunity }
