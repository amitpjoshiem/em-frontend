import { fetcher } from '@/api/fetcher/fetcher'

function fetchSignAnnuityIndex(id) {
  return fetcher({
    url: `/fixed_index_annuities/sign/${id}`,
    options: { method: 'POST' },
  })
}

export { fetchSignAnnuityIndex }
