import { fetcher } from '@/api/fetcher/fetcher'

function restoreAdminPanelUser(id) {
  return fetcher({
    url: `/admin/users/restore/${id}`,
    options: { method: 'POST' },
  })
}

export { restoreAdminPanelUser }
