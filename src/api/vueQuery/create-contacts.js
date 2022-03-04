import { fetcher } from '@/api/fetcher/fetcher'

function createContacts({ id, data }) {
  return fetcher({
    url: `/members/contacts/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { createContacts }
