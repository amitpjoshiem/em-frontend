import { useQuery } from 'vue-query'
import { fetchCompanies } from './vueQuery/fetch-companies'

export const useFetchCompanies = () => {
  const { isLoading, isError, isFetching, data } = useQuery(['companies'], () => {
    return fetchCompanies()
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
  }
}
