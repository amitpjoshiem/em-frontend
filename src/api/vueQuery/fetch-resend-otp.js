import { fetcher } from '@/api/fetcher/fetcher'

function fetchResendOtp() {
  return fetcher({
    url: `/otps/resend`,
    options: { method: 'GET' },
  })
}

export { fetchResendOtp }
