import { fetcher } from '@/api/fetcher/fetcher'

function deleteEmploymentHistory(id) {
  return fetcher({
    url: `/employment_history/${id}`,
    options: { method: 'DELETE' },
  })
}

export { deleteEmploymentHistory }
