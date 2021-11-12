import { useQuery } from 'vue-query'
import { fetchExcelDocuments } from './vueQuery/fetch-excel-dosuments'

export const useFetchExcelDocuments = (id) => {
  const { isLoading, isError, isFetching, data, isFetched } = useQuery(['excelDocuments'], () => {
    return fetchExcelDocuments(id)
  })

  return {
    isLoading,
    isError,
    data,
    isFetching,
    isFetched,
  }
}
