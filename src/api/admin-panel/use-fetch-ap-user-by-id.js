import { useQuery } from 'vue-query'
import { fetchAdminPanelUserById } from '../vueQuery/admin-panel/fetch-admin-panel-user-by-id.js'

import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export const useFetchAdminPanelUserById = (options) => {
  const store = useStore()
  const reactiveId = computed(() => store.state.adminPanelUsers.profileUserId)
  const queryKey = reactive([
    ['admin-panel-user-by-id', reactiveId],
    {
      reactiveId,
    },
  ])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchAdminPanelUserById,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
