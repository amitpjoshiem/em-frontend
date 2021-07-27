import { fetcher } from '@/api/fetcher/fetcher'

function fetchUserProfile() {
  return fetcher({
    url: `/users/profile`,
    options: { method: 'GET' },
  })
}

export { fetchUserProfile }
