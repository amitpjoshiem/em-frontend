import { useFetch } from '@/api/use-fetch'

const useGoogleQr = () => {
  const { response, error, fetching, fetchData } = useFetch('/otps/google/qr', {
    method: 'GET',
  })

  const getGoogleQr = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    getGoogleQr,
  }
}

export { useGoogleQr }
