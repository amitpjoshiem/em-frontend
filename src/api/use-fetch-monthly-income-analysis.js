import { useQuery } from 'vue-query'
import { fetchMonthlyIncomeAnalysis } from './vueQuery/fetch-monthly-income-analysis'
import { MonthlyIncomeAnalysis } from '../dto/MonthlyIncomeAnalysis'

export const useFetchMonthlyIncomeAnalysis = (id) => {
  const { isLoading, isError, data } = useQuery(
    ['blueprint/incomeAnalysis'],
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
    isError,
    data,
  }
}
