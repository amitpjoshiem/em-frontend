import { useFetch } from '@/api/use-fetch'

const useDownloadBlueReport = (member_id) => {
  const { response, error, fetching, fetchData } = useFetch(`/blueprint/pdf/${member_id}/`, {
    method: 'GET',
  })

  const getBlueReport = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    getBlueReport,
  }
}

export { useDownloadBlueReport }
