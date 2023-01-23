import { fetcher } from '@/api/fetcher/fetcher'

function fetchClientsHelp({ queryKey }) {
  const page = queryKey[1]

  return fetcher({
    url: `/clients/help/${page}`,
    options: { method: 'GET' },
  })
}

export { fetchClientsHelp }
