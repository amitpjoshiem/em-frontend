import { useQuery } from 'vue-query'
import { fetchYodleeProviders } from './vueQuery/fetch-yodlee-providers'

export const useYodleeProviders = (id) => {
  const { isLoading, isError, data } = useQuery(['yodlee/providers', id], () => {
    return fetchYodleeProviders(id)
  })

  return {
    isLoading,
    isError,
    data,
  }
}
