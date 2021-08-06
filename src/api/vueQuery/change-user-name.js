import { fetcher } from '@/api/fetcher/fetcher'

function changeUserName(data) {
  const { form, id } = data
  return fetcher({
    url: `/users/` + id,
    data: form,
    options: { method: 'PATCH' },
  })
}

export { changeUserName }
