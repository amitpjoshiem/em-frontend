import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchMemberNewStep } from './vueQuery/fetch-member-new-step'

export const useFetchMember = ({ id }, options = {}) => {
  const queryKey = reactive([['memberNewStep', id]])

  const query = useQuery(queryKey, {
    queryFn: fetchMemberNewStep,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
