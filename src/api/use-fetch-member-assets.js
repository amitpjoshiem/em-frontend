import { useFetch } from '@/api/use-fetch'

const useFetchMemberAssets = (id) => {
  const { response, error, fetching, fetchData } = useFetch(`/assets_income/${id}`, {
    method: 'GET',
  })

  const getMemberAssets = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    getMemberAssets,
  }
}

export { useFetchMemberAssets }
