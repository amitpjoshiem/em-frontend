import { useQuery } from 'vue-query'
import { fetcher } from '@/api/fetcher/fetcher'

const useFetchMemberAssetsSchema = (id) => {
  const { data, error, isFetching, isLoading } = useQuery(['memberAssetsSchema', id], () => {
    return fetcher({
      url: `/assets_income/schema/${id}`,
      options: { method: 'GET' },
    })
  })

  return {
    data,
    error,
    isFetching,
    isLoading,
  }
}

export { useFetchMemberAssetsSchema }
