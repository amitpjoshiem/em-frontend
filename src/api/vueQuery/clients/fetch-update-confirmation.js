import { fetcher } from '@/api/fetcher/fetcher'

function updateConfirmation(form) {
  return fetcher({
    url: `/clients/confirmation`,
    data: form,
    options: { method: 'POST' },
  })
}

export { updateConfirmation }
