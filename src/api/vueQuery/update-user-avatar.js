import { fetcher } from '@/api/fetcher/fetcher'

function updateUserAvatar(data) {
  const { form, id } = data
  return fetcher({
    url: `/users/${id}`,
    data: form,
    options: { method: 'PATCH' },
  })
}

export { updateUserAvatar }
