import { fetcher } from '@/api/fetcher/fetcher'

function fetchAnnuityIndex(id) {
  return fetcher({
    url: `/fixed_index_annuities/all/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchAnnuityIndex }
