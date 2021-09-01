import { fetcher } from '@/api/fetcher/fetcher'

function updateMembers(data) {
  const { form, id } = data
  return fetcher({
    url: `/members/${id}`,
    data: form,
    options: { method: 'PATCH' },
  })
}

export { updateMembers }
