import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchGetClientsConfirmation } from './vueQuery/fetch-get-clients-confirmation'

export const useFetchGetClietsConfirmation = (id, options = {}) => {
  console.log('id-id-id - ', id)
  const queryKey = reactive([['clientsGetConfirmation', id]])

  const query = useQuery(queryKey, {
    queryFn: fetchGetClientsConfirmation,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
