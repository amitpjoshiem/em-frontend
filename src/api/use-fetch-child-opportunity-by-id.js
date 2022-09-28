import { useQuery } from 'vue-query'
import { fetchChildOpportunityById } from './vueQuery/fetch-child-opportunity-by-id.js'
import { useStore } from 'vuex'
import { reactive, computed, ref } from 'vue'

export const useFetchChildOpportunityById = (options = {}) => {
  const store = useStore()
  const id = computed(() => store.state.globalComponents.opportunityId)

  const reactiveId = ref(id)

  const queryKey = reactive([
    ['chils-opportunity-by-id'],
    {
      reactiveId,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchChildOpportunityById,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
