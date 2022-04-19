import { useQuery } from 'vue-query'
import { UserProfile } from '../dto/UserProfile'
import { fetchUserProfile } from './vueQuery/fetch-user-profile'

import { reactive, ref } from 'vue'

export const useUserProfile = (filter) => {
  const reactiveFilter = ref(filter)

  const queryKey = reactive([
    'users',
    {
      reactiveFilter,
    },
  ])

  const query = useQuery(queryKey, {
    queryFn: fetchUserProfile,
    select: (data) => {
      return new UserProfile(data.data)
    },
  })

  return {
    ...query,
  }
}
