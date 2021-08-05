import { useFetch } from '@/api/use-fetch'

const useChangePassword = () => {
  const { response, error, fetching, fetchData } = useFetch('/password', {
    method: 'PUT',
  })

  const changePassword = async (body) => {
    await fetchData({ body })
  }

  return {
    response,
    error,
    fetching,
    changePassword,
  }
}

export { useChangePassword }
