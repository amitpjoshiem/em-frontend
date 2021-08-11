import { fetcher } from '@/api/fetcher/fetcher'

function fetchEmploymentHistory(id) {
  return fetcher({
    url: `/members/${id}/employment_history`,
    options: { method: 'GET' },
  })
}

export { fetchEmploymentHistory }
