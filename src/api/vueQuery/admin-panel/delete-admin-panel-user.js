import { fetcher } from '@/api/fetcher/fetcher'

function deleteAdminPanelUsers({ id, data }) {
  return fetcher({
    url: `/admin/users/${id}`,
    data,
    options: { method: 'DELETE' },
  })
}

export { deleteAdminPanelUsers }
