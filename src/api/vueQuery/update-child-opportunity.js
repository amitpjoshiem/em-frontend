import { fetcher } from '@/api/fetcher/fetcher'

function updateChildOpportunity({ data, id }) {
  return fetcher({
    url: `/salesforce/child_opportunity/${id}`,
    data,
    options: { method: 'PATCH' },
  })
}

export { updateChildOpportunity }
