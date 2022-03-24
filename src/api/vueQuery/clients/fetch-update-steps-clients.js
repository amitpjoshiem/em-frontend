import { fetcher } from '@/api/fetcher/fetcher'

function updateStepsClients(step) {
  return fetcher({
    url: `/clients/steps`,
    data: step,
    options: { method: 'POST' },
  })
}

export { updateStepsClients }
