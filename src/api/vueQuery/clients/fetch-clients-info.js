import { fetcher } from '@/api/fetcher/fetcher'

function fetchClientsInfo() {
  return fetcher({
    url: `/clients/info`,
    options: { method: 'GET' },
  })
}

export { fetchClientsInfo }
