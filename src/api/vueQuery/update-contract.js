import { fetcher } from '@/api/fetcher/fetcher'

function updateContract(data) {
  const { form, id } = data
  return fetcher({
    url: `/client_reports/${id}`,
    data: form,
    options: { method: 'PATCH' },
  })
}

export { updateContract }
