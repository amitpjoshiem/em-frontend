import { fetcher } from '@/api/fetcher/fetcher'

function convertToClient(id) {
  return fetcher({
    url: `/members/convert/${id}`,
    options: { method: 'PATCH' },
  })
}

export { convertToClient }
