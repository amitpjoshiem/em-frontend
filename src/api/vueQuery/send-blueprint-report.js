import { fetcher } from '@/api/fetcher/fetcher'

function sendBlueprintReport({ data, doc_id }) {
  return fetcher({
    url: `/blueprint/share/${doc_id}`,
    data,
    options: { method: 'POST' },
  })
}

export { sendBlueprintReport }
