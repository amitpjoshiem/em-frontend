import { useQuery } from 'vue-query'
import { fetchAssetsConsolidationDocs } from './vueQuery/fetch-assets-consolidation-docs'

export const useFetchAssetsConsolidationDocs = (id) => {
  const { isLoading, isError, isFetching, data, isFetched } = useQuery(['assetsConsolidationDocs', id], () => {
    return fetchAssetsConsolidationDocs(id)
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
    isFetched,
  }
}
