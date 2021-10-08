import { fetcher } from '@/api/fetcher/fetcher'

function fetchPipeLineAum() {
  console.log('fetchPipeLineAum')
  return fetcher({
    url: `/pipeline/aum`,
    options: { method: 'GET' },
  })
}

export { fetchPipeLineAum }
