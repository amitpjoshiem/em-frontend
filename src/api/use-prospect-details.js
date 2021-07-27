import { useQuery } from 'vue-query'
import { ProspectDetailsUser } from '../dto/ProspectDetailsUser'
import { fetchProspect } from './vueQuery/fetch-prospect'

export const useProspectDetails = (id) => {
  const { isLoading, isError, data } = useQuery(
    ['members', id],
    () => {
      return fetchProspect(id)
    },
    {
      select: (data) => {
        return new ProspectDetailsUser(data.data)
      },
    }
  )

  return {
    isLoading,
    isError,
    data,
  }
}
