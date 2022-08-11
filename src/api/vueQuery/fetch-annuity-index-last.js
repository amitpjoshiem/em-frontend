import { fetcher } from '@/api/fetcher/fetcher'

function fetchAnnuityIndexLast(id) {
  return fetcher({
    url: `/fixed_index_annuities/all/${id}?orderBy=created_at&sortedBy=desc&limit=3`,
    options: { method: 'GET' },
  })
}

export { fetchAnnuityIndexLast }
