import { fetcher } from '@/api/fetcher/fetcher'

function fetchInit() {
  return fetcher({
    url: `/init`,
    options: { method: 'GET' },
  })
}

export { fetchInit }
