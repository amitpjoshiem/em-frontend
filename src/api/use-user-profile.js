import { useQuery } from 'vue-query'
import { UserProfile } from '../dto/UserProfile'
import { fetchUserProfile } from './vueQuery/fetch-user-profile'

export const useUserProfile = () => {
  const { isLoading, isError, data, isFetched } = useQuery(
    ['users'],
    () => {
      return fetchUserProfile()
    },
    {
      select: (data) => {
        return new UserProfile(data.data)
      },
    }
  )

  return {
    isLoading,
    isError,
    data,
    isFetched,
  }
}
