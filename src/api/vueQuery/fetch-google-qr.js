import { fetcher } from '@/api/fetcher/fetcher'

function fetchGoogleQr() {
  return fetcher({
    url: `/otps/google/qr`,
    options: { method: 'GET' },
  })
}

export { fetchGoogleQr }
