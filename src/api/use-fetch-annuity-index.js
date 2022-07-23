import { useQuery } from 'vue-query'
import { fetchAnnuityIndex } from './vueQuery/fetch-annuity-index'

export const useAnnuityIndex = (id) => {
  const { isLoading, isError, isFetching, data } = useQuery(['annuityIndex'], () => {
    return fetchAnnuityIndex(id)
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
  }
}
