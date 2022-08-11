import { fetcher } from '@/api/fetcher/fetcher'

function createAdminPanelUsers(data) {
  return fetcher({
    url: `/admin/users`,
    data,
    options: { method: 'POST' },
  })
}

export { createAdminPanelUsers }
