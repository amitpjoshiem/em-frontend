import { useQuery } from 'vue-query'
import { fetchPipeLineAum } from './vueQuery/fetch-pipeline-aum'

export const usePipeLineAum = () => {
  const { isLoading, isFetching, isError, data } = useQuery(['pipeline/aum'], () => {
    return fetchPipeLineAum()
  })

  return {
    isLoading,
    isFetching,
    isError,
    data,
  }
}
