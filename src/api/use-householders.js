import { useQuery } from 'vue-query'
import { UserFullInfo } from '../dto/UserFullInfo'
import { fetchMembersList } from './vueQuery/fetch-members-list'
import { computed, reactive, ref } from 'vue'

import { useStore } from 'vuex'

export const useHouseholders = () => {
  const store = useStore()

  const houseHolderType = computed(() => {
    return store.state.dashboard.houseHolderType
  })

  const limit = computed(
    () => store.state.globalComponents.itemsPerPage.values.dashboard
  )

  const reactiveType = ref(houseHolderType)
  const reactiveLimit = ref(limit)

  const queryKey = reactive([
    'householders',
    {
      reactiveType,
      reactiveLimit,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchMembersList,
    select: ({ data }) => {
      return data.map((houseHolder) => new UserFullInfo(houseHolder))
    },
  })

  return {
    ...query,
  }
}
