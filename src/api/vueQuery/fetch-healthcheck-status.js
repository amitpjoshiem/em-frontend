import { fetcher } from '@/api/fetcher/fetcher'

function fetchHealthcheckStatus() {
  return fetcher({
    url: `/partners/healthcheck`,
    options: { method: 'GET' },
  })
}

export { fetchHealthcheckStatus }
