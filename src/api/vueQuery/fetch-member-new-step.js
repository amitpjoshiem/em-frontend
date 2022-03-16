import { fetcher } from '@/api/fetcher/fetcher'

function fetchMemberNewStep({ queryKey }) {
  const id = queryKey[0][1]

  return fetcher({
    url: `/members/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchMemberNewStep }
