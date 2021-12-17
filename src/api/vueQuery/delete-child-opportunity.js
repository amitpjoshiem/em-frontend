import { fetcher } from '@/api/fetcher/fetcher'

function deleteChildOpportunity(id) {
  return fetcher({
    url: `/salesforce/child_opportunity/${id}`,
    options: { method: 'DELETE' },
  })
}

export { deleteChildOpportunity }
