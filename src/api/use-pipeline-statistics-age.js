import { useQuery } from 'vue-query'
import { fetchPipeLineStatisticsAge } from './vueQuery/fetch-pipeline-statistics-age'

export const usePipeLineStatisticsAge = () => {
  const { isLoading, isError, data } = useQuery(['pipeline/statisticsAge'], () => {
    return fetchPipeLineStatisticsAge()
  })

  return {
    isLoading,
    isError,
    data,
  }
}
