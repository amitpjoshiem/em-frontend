import { useQuery } from 'vue-query'
import { fetchPipeLineStatisticsCount } from './vueQuery/fetch-pipeline-statistics-count'

export const usePipeLineStatisticsCount = () => {
  const { isLoading, isError, data } = useQuery(['pipeline/statisticsCount'], () => {
    return fetchPipeLineStatisticsCount()
  })

  return {
    isLoading,
    isError,
    data,
  }
}
