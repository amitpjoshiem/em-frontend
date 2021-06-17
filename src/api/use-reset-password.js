import { useFetch } from '@/api/use-fetch'

const useResetPassword = () => {
  const { response, error, fetching, fetchData } = useFetch('/password/reset', {
    method: 'POST',
  })

  const newPass = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    newPass,
  }
}

export { useResetPassword }
