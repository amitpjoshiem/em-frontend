import { useQuery } from 'vue-query'
import { fetchAnnuityIndexLast } from './vueQuery/fetch-annuity-index-last'

export const useAnnuityIndexLast = (id) => {
  const { isLoading, isError, isFetching, data } = useQuery(['annuityIndexLast', id], () => {
    return fetchAnnuityIndexLast(id)
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
  }
}
