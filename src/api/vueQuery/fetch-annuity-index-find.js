import { fetcher } from '@/api/fetcher/fetcher'

function fetchAnnuityIndexFind({ queryKey }) {
  const id = queryKey[1]

  return fetcher({
    url: `/fixed_index_annuities/find/${id}`,
    options: { method: 'GET' },
  })
}

export { fetchAnnuityIndexFind }
