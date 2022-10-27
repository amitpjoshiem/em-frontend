import { fetcher } from '@/api/fetcher/fetcher'

function fetchMemberAssetsSchema({ queryKey }) {
  const id = queryKey[1]
  return fetcher({
    url: `/assets_income/schema/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchMemberAssetsSchema }
