import { fetcher } from '@/api/fetcher/fetcher'

function uploadMedia(data) {
  return fetcher({
    url: `/media`,
    data,
    options: { method: 'POST', headers: { 'Content-Type': 'multipart/form-data' } },
  })
}

export { uploadMedia }
