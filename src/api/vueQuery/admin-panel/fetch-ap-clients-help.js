import { fetcher } from '@/api/fetcher/fetcher'

function fetchApClientsHelp() {
  return fetcher({
    url: `/admin/clients/help`,
    options: { method: 'GET' },
  })
}

export { fetchApClientsHelp }
