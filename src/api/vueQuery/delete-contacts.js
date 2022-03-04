import { fetcher } from '@/api/fetcher/fetcher'

function deleteContacts(id) {
  return fetcher({
    url: `/members/contacts/${id}`,
    options: { method: 'DELETE' },
  })
}

export { deleteContacts }
