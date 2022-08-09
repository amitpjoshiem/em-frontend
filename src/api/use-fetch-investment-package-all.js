import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchInvestmentPackageAll } from './vueQuery/fetch-investment-package-all'

export const useInvestmentPackageAll = (id) => {
  const queryKey = reactive(['investment-package-all', id])

  const query = useQuery(queryKey, {
    queryFn: fetchInvestmentPackageAll,
  })

  return {
    ...query,
  }
}
