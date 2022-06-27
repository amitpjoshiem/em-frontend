import { fetcher } from '@/api/fetcher/fetcher'

function fetchAdminPanelRolesCompanies() {
  return fetcher({
    url: `/admin/users/init`,
    options: { method: 'GET' },
  })
}

export { fetchAdminPanelRolesCompanies }
