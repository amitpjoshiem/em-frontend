import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchMonthlyExpense } from './vueQuery/fetch-monthly-expense'

export const useFetchMonthlyExpense = ({ id }, options = {}) => {
  const queryKey = reactive([['monthly-expense', id]])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchMonthlyExpense,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
