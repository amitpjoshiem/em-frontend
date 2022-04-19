import { fetcher } from '@/api/fetcher/fetcher'

function fetchClientsConfirmation() {
  return fetcher({
    url: `/clients/confirmation`,
    options: { method: 'GET' },
  })
}

export { fetchClientsConfirmation }
