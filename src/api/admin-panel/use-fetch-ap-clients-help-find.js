import { useQuery } from 'vue-query'
import { fetchApClientsHelpFind } from '../vueQuery/admin-panel/fetch-ap-clients-help-find.js'
import { reactive, ref } from 'vue'

export const useFetchApClientsHelpFind = (id) => {
  const reactiveId = ref(id)

  const queryKey = reactive([
    'admin-panel-clients-help-find',
    {
      reactiveId,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchApClientsHelpFind,
    select: ({ data }) => {
      return data
    },
  })

  return {
    ...query,
  }
}
