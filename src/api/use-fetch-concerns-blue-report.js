import { useQuery } from 'vue-query'
import { fetchConcernsBlueReport } from './vueQuery/fetch-concerns-blue-report'
import { ConcernsBlueReport } from '../dto/ConcernsBlueReport'

export const useFetchConcernsBlueReport = (id) => {
  const { isLoading, isError, data, isFetching } = useQuery(
    ['blueprint/concern', id],
    () => {
      return fetchConcernsBlueReport(id)
    },
    {
      placeholderData: {
        data: new ConcernsBlueReport(),
      },
      select: (data) => {
        return new ConcernsBlueReport(data.data)
      },
    }
  )

  return {
    isLoading,
    isError,
    data,
    isFetching,
  }
}
