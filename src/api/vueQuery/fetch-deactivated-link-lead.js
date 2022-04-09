import { fetcher } from '@/api/fetcher/fetcher'

function deactivatedLinkLead(id) {
  return fetcher({
    url: `/clients/token/${id}`,
    options: { method: 'DELETE' },
  })
}

export { deactivatedLinkLead }
