import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchMember } from './vueQuery/fetch-member'

export const useFetchMember = ({ id }, options = {}) => {
  const queryKey = reactive([['member', id.value]])

  const query = useQuery(queryKey, {
    queryFn: fetchMember,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
