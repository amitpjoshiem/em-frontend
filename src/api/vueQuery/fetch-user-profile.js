import { fetcher } from '@/api/fetcher/fetcher'

function fetchUserProfile({ queryKey }) {
  const searchParams = {}
  const filter = queryKey[1].reactiveFilter ? queryKey[1].reactiveFilter : ''

  if (filter) searchParams.filter = filter

  return fetcher({
    url: `/users/profile?include=avatar`,
    options: { method: 'GET', searchParams },
  })
}

export { fetchUserProfile }
