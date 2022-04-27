import { useQuery } from 'vue-query'
import { fetchPipeLineStatisticsCount } from './vueQuery/fetch-pipeline-statistics-count'

export const usePipeLineStatisticsCount = () => {
  const { isLoading, isError, isFetching, data } = useQuery(['pipeline/statisticsCount'], () => {
    return fetchPipeLineStatisticsCount()
  })

  return {
    isLoading,
    isFetching,
    isError,
    data,
  }
}
