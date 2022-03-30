import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchClientsConfirmation } from '../vueQuery/clients/fetch-clients-confirmation'

export const useFetchClietsConfirmation = (options = {}) => {
  const queryKey = reactive([['clientsConfirmation']])

  const query = useQuery(queryKey, {
    queryFn: fetchClientsConfirmation,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
