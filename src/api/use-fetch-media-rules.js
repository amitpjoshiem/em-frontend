import { useQuery } from 'vue-query'
import { fetchMediaRules } from './vueQuery/fetch-media-rules'

export const useFetchMediaRules = ({ collection }) => {
  const { isLoading, isError, data } = useQuery(['media-rules'], () => {
    return fetchMediaRules(collection)
  })

  return {
    isLoading,
    isError,
    data,
  }
}
