import { fetcher } from '@/api/fetcher/fetcher'

function updateAnnuityIndex({ id, form }) {
  return fetcher({
    url: `/fixed_index_annuities/${id}`,
    data: form,
    options: { method: 'PATCH' },
  })
}

export { updateAnnuityIndex }
