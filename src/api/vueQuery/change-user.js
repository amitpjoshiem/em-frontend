import { fetcher } from '@/api/fetcher/fetcher'

function changeUser(data) {
  const { form, id } = data
  return fetcher({
    url: `/users/` + id,
    data: form,
    options: { method: 'PATCH' },
  })
}

export { changeUser }
