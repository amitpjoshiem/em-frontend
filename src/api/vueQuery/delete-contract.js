import { fetcher } from '@/api/fetcher/fetcher'

function deleteContract(id) {
  return fetcher({
    url: `/client_reports/${id}`,
    options: { method: 'DELETE' },
  })
}

export { deleteContract }
