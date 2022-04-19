import { fetcher } from '@/api/fetcher/fetcher'

function fetchGetClientsDocuments({ queryKey }) {
  const collection = queryKey[1]
  const id = queryKey[2]

  return fetcher({
    url: `/clients/docs/get/${id}/${collection}?orderBy=created_at&sortedBy=desc`,
    options: { method: 'GET' },
  })
}

export { fetchGetClientsDocuments }
