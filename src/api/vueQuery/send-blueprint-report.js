import { fetcher } from '@/api/fetcher/fetcher'

function sendBlueprintReport({ data, member_id }) {
  return fetcher({
    url: `/blueprint/pdf/share/${member_id}`,
    data,
    options: { method: 'POST' },
  })
}

export { sendBlueprintReport }
