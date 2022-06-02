import { useQuery } from 'vue-query'
import { fetchAssistens } from './vueQuery/fetch-assistents'

export const useFetchAssistents = () => {
  const { isLoading, isError, isFetching, data, isFetched } = useQuery(['assistents'], () => {
    return fetchAssistens()
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
    isFetched,
  }
}
