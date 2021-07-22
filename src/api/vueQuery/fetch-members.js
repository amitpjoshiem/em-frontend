import { fetcher } from '@/api/fetcher/fetcher'

function fetchMembersList({ queryKey, ...rest }) {
  console.log('PROPS', { queryKey, rest })
  const type = queryKey
  return fetcher({
    url: `/members`,
    options: { method: 'GET', searchParams: { type } },
  })
}

export { fetchMembersList }
