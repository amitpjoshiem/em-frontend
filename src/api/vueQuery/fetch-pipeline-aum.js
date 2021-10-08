import { fetcher } from '@/api/fetcher/fetcher'

function fetchPipeLineAum() {
  return fetcher({
    url: `/pipeline/aum`,
    options: { method: 'GET' },
  })
}

export { fetchPipeLineAum }
