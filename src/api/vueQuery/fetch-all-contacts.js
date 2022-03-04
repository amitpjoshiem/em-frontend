import { fetcher } from '@/api/fetcher/fetcher'

function fetchAllContacts(id) {
  return fetcher({
    url: `/members/contacts/${id}?orderBy=created_at&sortedBy=desc`,
    options: { method: 'GET' },
  })
}

export { fetchAllContacts }
