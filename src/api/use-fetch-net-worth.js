import { useQuery } from 'vue-query'
import { fetchNetWorth } from './vueQuery/fetch-net-worth'

export const useFetchNetWorth = (id) => {
  const { isLoading, isFetched, isFetching, isError, data } = useQuery(
    ['blueprint/netWorth', id],
    () => {
      return fetchNetWorth(id)
    },
    {
      select: (data) => {
        return data
      },
    }
  )

  return {
    isLoading,
    isFetching,
    isFetched,
    isError,
    data,
  }
}
