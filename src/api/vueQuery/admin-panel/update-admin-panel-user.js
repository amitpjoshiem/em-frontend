import { fetcher } from '@/api/fetcher/fetcher'

function updateAdminPanelUser({ id, data }) {
  return fetcher({
    url: `/admin/users/${id}`,
    data,
    options: { method: 'PATCH' },
  })
}

export { updateAdminPanelUser }
