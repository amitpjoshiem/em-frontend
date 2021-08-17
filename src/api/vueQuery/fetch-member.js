import { fetcher } from '@/api/fetcher/fetcher'

function fetchMember(id) {
  return fetcher({
    url: `/members/` + id,
    options: { method: 'GET' },
  })
}

export { fetchMember }
