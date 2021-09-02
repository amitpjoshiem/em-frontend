import { useFetch } from '@/api/use-fetch'

const useFetchMember = (id) => {
  const { response, error, fetching, fetchData } = useFetch(`/members/${id}`, {
    method: 'GET',
  })

  const getMember = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    getMember,
  }
}

export { useFetchMember }
