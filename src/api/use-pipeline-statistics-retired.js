import { useQuery } from 'vue-query'
import { fetchPipeLineStatisticsRetired } from './vueQuery/fetch-pipeline-statistics-retired'

export const usePipeLineStatisticsRetired = () => {
  const { isLoading, isError, data } = useQuery(['pipeline/statisticsRetired'], () => {
    return fetchPipeLineStatisticsRetired()
  })

  return {
    isLoading,
    isError,
    data,
  }
}
