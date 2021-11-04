import { useQuery } from 'vue-query'
import { fetchMonthlyIncomeAnalysis } from './vueQuery/fetch-monthly-income-analysis'
import { MonthlyIncomeAnalysis } from '../dto/MonthlyIncomeAnalysis'

export const useFetchMonthlyIncomeAnalysis = (id) => {
  const { isLoading, isFetching, isError, data, isFetched } = useQuery(
    ['blueprint/incomeAnalysis', id],
    () => {
      return fetchMonthlyIncomeAnalysis(id)
    },
    {
      placeholderData: {
        data: new MonthlyIncomeAnalysis(),
      },
      select: (data) => {
        return new MonthlyIncomeAnalysis(data.data)
      },
    }
  )

  return {
    isLoading,
    isFetching,
    isError,
    data,
    isFetched,
  }
}
