import { fetcher } from '@/api/fetcher/fetcher'

function fetchProspect(id) {
  return fetcher({
    url: `/members/` + id,
    options: { method: 'GET' },
  })
}

export { fetchProspect }
