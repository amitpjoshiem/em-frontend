import { fetcher } from '@/api/fetcher/fetcher'

function sendLinkNewLead(data) {
  return fetcher({
    url: `/clients/create`,
    data,
    options: { method: 'POST' },
  })
}

export { sendLinkNewLead }
