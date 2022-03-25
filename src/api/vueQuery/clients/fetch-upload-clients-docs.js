import { fetcher } from '@/api/fetcher/fetcher'

function uploadClientsDocs({ collection, data }) {
  return fetcher({
    url: `/clients/docs/upload/${collection}`,
    data,
    options: { method: 'POST' },
  })
}

export { uploadClientsDocs }
