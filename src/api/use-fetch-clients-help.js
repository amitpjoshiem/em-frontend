import { useQuery } from 'vue-query'
import { reactive, computed } from 'vue'
import { fetchClientsHelp } from './vueQuery/fetch-clients-help'
import store from '@/store'

export const useFetchClientsHelp = (options = {}) => {
  const page = computed(() => store.state.globalComponents.pageClientsHelp)

  const queryKey = reactive(['clients-help', page])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchClientsHelp,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
