import { fetcher } from '@/api/fetcher/fetcher'

function convertLeadToOpportunity(id) {
  return fetcher({
    url: `/members/lead/convert/${id}`,
    options: { method: 'PATCH' },
  })
}

export { convertLeadToOpportunity }
