import { useQuery } from 'vue-query'
import { fetchAsetsConsolidationsMember } from './vueQuery/fetch-asets-consolidations-member'
import { AssetsConsolidation } from '../dto/AssetsConsolidation'
import { reactive } from 'vue'

export const useAsetsConsolidationsMember = (id) => {
  let total = reactive({})

  const { isLoading, isFetching, isError, data } = useQuery(
    ['AsetsConsolidationsMember', id],
    () => {
      return fetchAsetsConsolidationsMember(id)
    },
    {
      select: (data) => {
        total.value = data.data.filter((item) => {
          return item.table === 'total'
        })

        return data.data.filter((item) => {
          if (item.table !== 'total') return new AssetsConsolidation(item)
        })
      },
    }
  )

  return {
    isLoading,
    isFetching,
    isError,
    data,
    total,
  }
}
