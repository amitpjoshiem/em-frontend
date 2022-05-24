import { fetcher } from '@/api/fetcher/fetcher'

function updateClients(form) {
  return fetcher({
    url: `/clients/`,
    data: form,
    options: { method: 'PATCH' },
  })
}

export { updateClients }
