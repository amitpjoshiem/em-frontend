import { fetcher } from '@/api/fetcher/fetcher'

function fetchConcernsBlueReport(id) {
  return fetcher({
    url: `/blueprint/concern/` + id,
    options: { method: 'GET' },
  })
}

export { fetchConcernsBlueReport }
