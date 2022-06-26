import { fetcher } from '@/api/fetcher/fetcher'

function deleteAdminPanelUsers(id) {
  return fetcher({
    url: `/admin/users/${id}`,
    options: { method: 'DELETE' },
  })
}

export { deleteAdminPanelUsers }
