import { fetcher } from '@/api/fetcher/fetcher'

function createAdminPanelPassword(id) {
  return fetcher({
    url: `/admin/users/send/${id}`,
    options: { method: 'POST' },
  })
}

export { createAdminPanelPassword }
