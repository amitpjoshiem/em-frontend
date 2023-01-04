import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchGoogleQr } from './vueQuery/fetch-google-qr'

export const useFetchGoogleQr = (options = {}) => {
  const queryKey = reactive(['google-qr'])

  const query = useQuery(queryKey, {
    queryFn: fetchGoogleQr,
    select: ({ data }) => {
      return data
    },
    ...options,
  })

  return {
    ...query,
  }
}
