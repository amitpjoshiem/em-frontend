import { fetcher } from '@/api/fetcher/fetcher'

function deleteHousingInformation(id) {
  return fetcher({
    url: `/house/${id}`,
    options: { method: 'DELETE' },
  })
}

export { deleteHousingInformation }
