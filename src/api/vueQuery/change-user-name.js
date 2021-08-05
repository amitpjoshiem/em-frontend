import { fetcher } from '@/api/fetcher/fetcher'

function changeUserName(data) {
  const { form, id } = data
  console.log('id - ', id)
  return fetcher({
    url: `/users/` + id,
    data: form,
    options: { method: 'PATCH' },
  })
}

export { changeUserName }
