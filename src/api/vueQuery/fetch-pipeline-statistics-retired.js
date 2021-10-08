import { fetcher } from '@/api/fetcher/fetcher'

function fetchPipeLineStatisticsRetired() {
  return fetcher({
    url: `/pipeline/member/statistics/retired`,
    options: { method: 'GET' },
  })
}

export { fetchPipeLineStatisticsRetired }
