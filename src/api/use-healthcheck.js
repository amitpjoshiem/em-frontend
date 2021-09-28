import { useQuery } from 'vue-query'
import { fetchHealthcheckStatus } from './vueQuery/fetch-healthcheck-status'

export const useHealthcheck = () => {
  const { isLoading, isError, data } = useQuery(['healthcheck'], () => {
    return fetchHealthcheckStatus()
  })

  return {
    isLoading,
    isError,
    data,
  }
}
