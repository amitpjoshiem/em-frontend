import { useFetch } from '@/api/use-fetch'

const useDownloadClientReport = (id) => {
  const { response, error, fetching, fetchData } = useFetch(`/client_reports/pdf/${id}/`, {
    method: 'GET',
  })

  const getClientReport = async (body) => {
    await fetchData({ body })
    if (error.value !== null) return
  }

  return {
    response,
    error,
    fetching,
    getClientReport,
  }
}

export { useDownloadClientReport }
