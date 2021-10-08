import { useQuery } from 'vue-query'
import { fetchPipeLineAum } from './vueQuery/fetch-pipeline-aum'

export const usePipeLineAum = () => {
  console.log('usePipeLineAum')
  const { isLoading, isError, data } = useQuery(['pipeline/aum'], () => {
    return fetchPipeLineAum()
  })

  return {
    isLoading,
    isError,
    data,
  }
}
