import { fetcher } from '@/api/fetcher/fetcher'

function otpsChange(data) {
  return fetcher({
    url: `/otps/change`,
    data,
    options: { method: 'POST' },
  })
}

export { otpsChange }
