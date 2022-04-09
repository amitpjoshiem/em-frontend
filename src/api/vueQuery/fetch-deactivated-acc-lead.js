import { fetcher } from '@/api/fetcher/fetcher'

function deactivatedAccLead(id) {
  return fetcher({
    url: `/clients/${id}`,
    options: { method: 'DELETE' },
  })
}

export { deactivatedAccLead }
