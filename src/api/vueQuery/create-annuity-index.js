import { fetcher } from '@/api/fetcher/fetcher'

function createAnnuityIndex({ id, data }) {
  return fetcher({
    url: `/fixed_index_annuities/${id}`,
    data,
    options: { method: 'POST' },
  })
}

export { createAnnuityIndex }
