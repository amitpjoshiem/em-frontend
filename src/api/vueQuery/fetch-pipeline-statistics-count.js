import { fetcher } from '@/api/fetcher/fetcher'

function fetchPipeLineStatisticsCount() {
  return fetcher({
    url: `/pipeline/member/statistics/count`,
    options: { method: 'GET' },
  })
}

export { fetchPipeLineStatisticsCount }
