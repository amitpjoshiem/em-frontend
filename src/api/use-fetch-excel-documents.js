import { useQuery } from 'vue-query'
import { fetchExcelDocuments } from './vueQuery/fetch-excel-documents'

export const useFetchExcelDocuments = (id) => {
  const { isLoading, isError, isFetching, data, isFetched, refetch } = useQuery(['excelDocuments', id], () => {
    return fetchExcelDocuments(id)
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
    isFetched,
    refetch,
  }
}
