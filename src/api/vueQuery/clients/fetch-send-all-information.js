import { fetcher } from '@/api/fetcher/fetcher'

function sendAllInformation() {
  return fetcher({
    url: `/clients/submit`,
    options: { method: 'POST' },
  })
}

export { sendAllInformation }
