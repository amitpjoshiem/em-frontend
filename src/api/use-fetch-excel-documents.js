import { useQuery } from 'vue-query'
import { fetchExcelDocuments } from './vueQuery/fetch-excel-dosuments'

export const useFetchExcelDocuments = () => {
  const { isLoading, isError, isFetching, data, isFetched } = useQuery(['xxcelDocuments'], () => {
    return fetchExcelDocuments()
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
    isFetched,
  }
}
