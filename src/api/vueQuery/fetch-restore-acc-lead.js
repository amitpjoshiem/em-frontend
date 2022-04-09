import { fetcher } from '@/api/fetcher/fetcher'

function restoreAccLead(id) {
  return fetcher({
    url: `/clients/restore/${id}`,
    options: { method: 'POST' },
  })
}

export { restoreAccLead }
