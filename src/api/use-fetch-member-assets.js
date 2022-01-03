// import { useFetch } from '@/api/use-fetch'
import { useQuery } from 'vue-query'
import { fetcher } from '@/api/fetcher/fetcher'

const useFetchMemberAssets = (id) => {
  // const { response, error, fetching, fetchData } = useFetch(`/assets_income/${id}`, {
  //   method: 'GET',
  // })
  const { data, error, isFetching, isLoading } = useQuery(['MemberAssets', id], () => {
    return fetcher({
      url: `/assets_income/${id}`,
      options: { method: 'GET' },
    })
  })

  // const getMemberAssets = async (body) => {
  //   await fetchData({ body })
  //   if (error.value !== null) return
  // }

  return {
    response: data,
    error,
    fetching: isFetching,
    isLoading,
  }
}

export { useFetchMemberAssets }
