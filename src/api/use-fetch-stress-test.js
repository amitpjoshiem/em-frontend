import { useQuery } from 'vue-query'
import { fetchStressTest } from './vueQuery/fetch-stress-test'

export const useFetchStressTest = (id) => {
  const { isLoading, isError, isFetching, data } = useQuery(['stressTest', id], () => {
    return fetchStressTest(id)
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
  }
}
