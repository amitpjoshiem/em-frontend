import { useQuery } from 'vue-query'
import { fetcher } from '@/api/fetcher/fetcher'

export const useFetchAdminPanelCompanies = () => {
  const { isLoading, isError, isFetching, data, isFetched } = useQuery(['admin-panel-companies'], () => {
    return fetcher({
      url: `/admin/companies`,
      options: { method: 'GET' },
    })
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
    isFetched,
  }
}
