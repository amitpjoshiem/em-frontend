import { fetcher } from '@/api/fetcher/fetcher'

function fetchApClientsHelpFind({ queryKey }) {
  const id = queryKey[1].reactiveId ? queryKey[1].reactiveId : ''

  return fetcher({
    url: `/admin/clients/help/find/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchApClientsHelpFind }
