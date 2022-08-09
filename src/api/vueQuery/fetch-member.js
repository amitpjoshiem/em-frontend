import { fetcher } from '@/api/fetcher/fetcher'

function fetchMember(id) {
  return fetcher({
    url: `/members/` + id + '?include=salesforce',
    options: { method: 'GET' },
  })
}

export { fetchMember }
