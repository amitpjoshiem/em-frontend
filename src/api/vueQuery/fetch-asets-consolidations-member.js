import { fetcher } from '@/api/fetcher/fetcher'

function fetchAsetsConsolidationsMember(id) {
  return fetcher({
    url: `/assets_consolidations/` + id,
    options: { method: 'GET' },
  })
}

export { fetchAsetsConsolidationsMember }
