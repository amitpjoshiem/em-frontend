import { fetcher } from '@/api/fetcher/fetcher'

function fetchGetClientsConfirmation({ queryKey }) {
  const id = queryKey[0][1]
  console.log('id ---', id)

  return fetcher({
    url: `/clients/get/confirmation/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchGetClientsConfirmation }
