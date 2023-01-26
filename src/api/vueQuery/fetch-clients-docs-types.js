import { fetcher } from '@/api/fetcher/fetcher'

function fetchClientsDocsTypes() {
  return fetcher({
    url: `/clients/docs/types`,
    options: { method: 'OPTIONS' },
  })
}

export { fetchClientsDocsTypes }
