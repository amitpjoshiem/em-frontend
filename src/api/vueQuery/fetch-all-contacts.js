import { fetcher } from '@/api/fetcher/fetcher'

function fetchAllContacts(id) {
  return fetcher({
    url: `/members/contacts/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchAllContacts }
