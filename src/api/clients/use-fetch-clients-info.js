import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchClientsInfo } from '../vueQuery/clients/fetch-clients-info'

export const useFetchClietsInfo = (options = {}) => {
  const queryKey = reactive([['clientsInfo']])

  const query = useQuery(queryKey, {
    queryFn: fetchClientsInfo,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
