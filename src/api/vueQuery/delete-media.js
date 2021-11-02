import { fetcher } from '@/api/fetcher/fetcher'

function deleteMedia(id) {
  return fetcher({
    url: `/media/${id}`,
    options: { method: 'DELETE' },
  })
}

export { deleteMedia }
