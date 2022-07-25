import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchAnnuityIndexFind } from './vueQuery/fetch-annuity-index-find'

export const useAnnuityIndexFind = (id) => {
  const queryKey = reactive(['annuityIndexFind', id])

  const query = useQuery(queryKey, {
    queryFn: fetchAnnuityIndexFind,
  })

  return {
    ...query,
  }
}
