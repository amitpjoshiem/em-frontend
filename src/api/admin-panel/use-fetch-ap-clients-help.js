import { useQuery } from 'vue-query'
import { fetchApClientsHelp } from '../vueQuery/admin-panel/fetch-ap-clients-help.js'
import { reactive } from 'vue'

export const useFetchApClientsHelp = () => {
  const queryKey = reactive([['admin-panel-clients-help']])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchApClientsHelp,
    select: ({ data }) => {
      return data
    },
  })

  return {
    ...query,
  }
}
