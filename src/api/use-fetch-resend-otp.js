import { useQuery } from 'vue-query'
import { reactive } from 'vue'
import { fetchResendOtp } from './vueQuery/fetch-resend-otp'

export const useResendOtp = (options = {}) => {
  const queryKey = reactive(['resendOtp'])

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchResendOtp,
    ...options,
  })

  return {
    ...query,
  }
}
