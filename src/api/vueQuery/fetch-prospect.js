import { fetcher } from '@/api/fetcher/fetcher'

function fetchProspect(id) {
  return fetcher({
    url: `/members/` + id + '?include=salesforce',
    options: { method: 'GET' },
  })
}

export { fetchProspect }
