import { fetcher } from '@/api/fetcher/fetcher'

function fetchMediaRules(collection) {
  return fetcher({
    url: `/media/rules/${collection}`,
    options: { method: 'GET' },
  })
}

export { fetchMediaRules }
