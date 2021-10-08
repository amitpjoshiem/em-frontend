import { fetcher } from '@/api/fetcher/fetcher'

function fetchPipeLineStatisticsAge() {
  return fetcher({
    url: `/pipeline/member/statistics/age`,
    options: { method: 'GET' },
  })
}

export { fetchPipeLineStatisticsAge }
