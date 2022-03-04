import { fetcher } from '@/api/fetcher/fetcher'

function updateContacts(data) {
  const { form, id } = data
  return fetcher({
    url: `/members/contacts/${id}`,
    data: form,
    options: { method: 'PATCH' },
  })
}

export { updateContacts }
