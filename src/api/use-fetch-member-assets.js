import { useQuery } from 'vue-query'
import { fetcher } from '@/api/fetcher/fetcher'

const useFetchMemberAssets = (id) => {
  const { data, error, isFetching, isLoading } = useQuery(['memberAssets', id], () => {
    return fetcher({
      url: `/assets_income/${id}`,
      options: { method: 'GET' },
    })
  })

  return {
    response: data,
    error,
    fetching: isFetching,
    isLoading,
  }
}

export { useFetchMemberAssets }
