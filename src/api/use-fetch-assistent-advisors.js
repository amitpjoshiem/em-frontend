import { useQuery } from 'vue-query'
import { fetchAssistentAdvisors } from './vueQuery/fetch-assistent-advisors'

export const useFetchAssistentAdvisors = () => {
  const { isLoading, isError, isFetching, data, isFetched } = useQuery(['assistent-advisors'], () => {
    return fetchAssistentAdvisors()
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
    isFetched,
  }
}
