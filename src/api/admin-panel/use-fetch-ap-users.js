import { useQuery } from 'vue-query'
import { fetcher } from '@/api/fetcher/fetcher'

export const useFetchAdminPanelUsers = () => {
  const { isLoading, isError, isFetching, data, isFetched } = useQuery(['admin-panel-users'], () => {
    return fetcher({
      url: `/admin/users`,
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
