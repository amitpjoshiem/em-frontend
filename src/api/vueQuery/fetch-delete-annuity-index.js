import { fetcher } from '@/api/fetcher/fetcher'

function fetchDeleteAnnuityIndex(id) {
  return fetcher({
    url: `/fixed_index_annuities/${id}`,
    options: { method: 'DELETE' },
  })
}

export { fetchDeleteAnnuityIndex }
