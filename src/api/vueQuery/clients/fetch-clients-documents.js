import { fetcher } from '@/api/fetcher/fetcher'

function fetchClientsDocuments({ queryKey }) {
  const collection = queryKey[1]

  return fetcher({
    url: `/clients/docs/${collection}?orderBy=created_at&sortedBy=desc`,
    options: { method: 'GET' },
  })
}

export { fetchClientsDocuments }
