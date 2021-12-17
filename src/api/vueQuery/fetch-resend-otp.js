import { fetcher } from '@/api/fetcher/fetcher'

function fetchResendOtp() {
  console.log('fetchResendOtp')
  return fetcher({
    url: `/otps/resend`,
    options: { method: 'GET' },
  })
}

export { fetchResendOtp }
